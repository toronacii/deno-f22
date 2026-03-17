/**
 * Minimal XLSX reader using native Deno ZIP + XML parsing.
 * No external npm:xlsx dependency — reads XLSX as a ZIP archive,
 * then parses the XML sheet data.
 *
 * Returns a 2D array of cell values (string | number | null).
 */

/** Cell value types */
export type CellValue = string | number | null;

/** A sheet is a 2D array: rows × cols */
export type Sheet = CellValue[][];

/** All sheets keyed by sheet name */
export type Workbook = Map<string, Sheet>;

// ---------------------------------------------------------------------------
// ZIP reader (PKZIP format, supports stored and deflate)
// ---------------------------------------------------------------------------

interface ZipEntry {
  name: string;
  data: Uint8Array;
}

async function readZip(fileData: Uint8Array): Promise<Map<string, Uint8Array>> {
  const entries = new Map<string, Uint8Array>();

  // Find End of Central Directory record
  const view = new DataView(fileData.buffer, fileData.byteOffset, fileData.byteLength);

  let eocdOffset = -1;
  for (let i = fileData.length - 22; i >= 0; i--) {
    if (
      fileData[i] === 0x50 &&
      fileData[i + 1] === 0x4b &&
      fileData[i + 2] === 0x05 &&
      fileData[i + 3] === 0x06
    ) {
      eocdOffset = i;
      break;
    }
  }
  if (eocdOffset === -1) throw new Error("Not a valid ZIP file (no EOCD)");

  const cdOffset = view.getUint32(eocdOffset + 16, true);
  const cdCount = view.getUint16(eocdOffset + 8, true);

  let pos = cdOffset;
  for (let i = 0; i < cdCount; i++) {
    const sig = view.getUint32(pos, true);
    if (sig !== 0x02014b50) throw new Error(`Invalid CD signature at ${pos}`);

    const compressionMethod = view.getUint16(pos + 10, true);
    const compressedSize = view.getUint32(pos + 20, true);
    const uncompressedSize = view.getUint32(pos + 24, true);
    const fileNameLen = view.getUint16(pos + 28, true);
    const extraLen = view.getUint16(pos + 30, true);
    const commentLen = view.getUint16(pos + 32, true);
    const localHeaderOffset = view.getUint32(pos + 42, true);

    const nameBytes = fileData.subarray(pos + 46, pos + 46 + fileNameLen);
    const name = new TextDecoder().decode(nameBytes);

    pos += 46 + fileNameLen + extraLen + commentLen;

    // Read local file header
    const lhPos = localHeaderOffset;
    const lhSig = view.getUint32(lhPos, true);
    if (lhSig !== 0x04034b50) throw new Error(`Invalid local header at ${lhPos}`);

    const lhFileNameLen = view.getUint16(lhPos + 26, true);
    const lhExtraLen = view.getUint16(lhPos + 28, true);
    const dataStart = lhPos + 30 + lhFileNameLen + lhExtraLen;
    const compressedData = fileData.subarray(dataStart, dataStart + compressedSize);

    let uncompressed: Uint8Array;
    if (compressionMethod === 0) {
      // Stored
      uncompressed = compressedData;
    } else if (compressionMethod === 8) {
      // Deflate — use DecompressionStream
      const ds = new DecompressionStream("deflate-raw");
      const writer = ds.writable.getWriter();
      const reader = ds.readable.getReader();
      writer.write(compressedData);
      writer.close();

      const chunks: Uint8Array[] = [];
      let totalLen = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        totalLen += value.length;
      }
      uncompressed = new Uint8Array(totalLen);
      let offset = 0;
      for (const chunk of chunks) {
        uncompressed.set(chunk, offset);
        offset += chunk.length;
      }
    } else {
      throw new Error(`Unsupported compression method: ${compressionMethod} in ${name}`);
    }

    entries.set(name, uncompressed);
  }

  return entries;
}

// ---------------------------------------------------------------------------
// XML parser (minimal, SAX-like DOM builder)
// ---------------------------------------------------------------------------

/** Very simple DOM-like node */
interface XmlNode {
  tag: string;
  attrs: Record<string, string>;
  children: XmlNode[];
  text: string;
}

function parseXml(xmlText: string): XmlNode {
  // Remove XML declaration and namespaces for simplicity
  const text = xmlText
    .replace(/<\?xml[^?]*\?>/g, "")
    .replace(/\s+xmlns(:\w+)?="[^"]*"/g, "")
    .replace(/\s+mc:Ignorable="[^"]*"/g, "");

  const root: XmlNode = { tag: "__root__", attrs: {}, children: [], text: "" };
  const stack: XmlNode[] = [root];

  const tagRe = /<\/?([^\s>/]+)([^>]*)\/?>|([^<]+)/g;
  let match: RegExpExecArray | null;

  while ((match = tagRe.exec(text)) !== null) {
    if (match[3] !== undefined) {
      // Text node
      const parent = stack[stack.length - 1];
      parent.text += match[3].trim();
    } else {
      const full = match[0];
      const tagName = match[1];
      const attrsStr = match[2] ?? "";

      if (full.startsWith("</")) {
        // Closing tag
        stack.pop();
      } else {
        // Opening tag (or self-closing)
        const node: XmlNode = { tag: tagName, attrs: {}, children: [], text: "" };

        // Parse attributes
        const attrRe = /(\S+)="([^"]*)"/g;
        let attrMatch: RegExpExecArray | null;
        while ((attrMatch = attrRe.exec(attrsStr)) !== null) {
          node.attrs[attrMatch[1]] = attrMatch[2];
        }

        const parent = stack[stack.length - 1];
        parent.children.push(node);

        if (!full.endsWith("/>")) {
          stack.push(node);
        }
      }
    }
  }

  return root.children[0] ?? root;
}

function findAll(node: XmlNode, tag: string): XmlNode[] {
  const results: XmlNode[] = [];
  function walk(n: XmlNode) {
    if (n.tag === tag || n.tag.endsWith(`:${tag}`)) results.push(n);
    for (const child of n.children) walk(child);
  }
  walk(node);
  return results;
}

function findFirst(node: XmlNode, tag: string): XmlNode | null {
  for (const n of findAll(node, tag)) return n;
  return null;
}

// ---------------------------------------------------------------------------
// XLSX → Sheet converter
// ---------------------------------------------------------------------------

/** Parse shared strings table */
function parseSharedStrings(xml: string): string[] {
  const root = parseXml(xml);
  const items = findAll(root, "si");
  return items.map((si) => {
    // Collect all <t> text values
    const tNodes = findAll(si, "t");
    return tNodes.map((t) => decodeXmlEntities(t.text)).join("");
  });
}

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)));
}

/** Convert column letters to 0-based index: A→0, Z→25, AA→26 */
function colLetterToIndex(col: string): number {
  let idx = 0;
  for (const ch of col.toUpperCase()) {
    idx = idx * 26 + (ch.charCodeAt(0) - 64);
  }
  return idx - 1;
}

/** Parse a cell reference like "A1" → { row: 0, col: 0 } */
function parseCellRef(ref: string): { row: number; col: number } {
  const m = ref.match(/^([A-Z]+)(\d+)$/i);
  if (!m) throw new Error(`Invalid cell ref: ${ref}`);
  return { col: colLetterToIndex(m[1]), row: parseInt(m[2]) - 1 };
}

/** Parse a single worksheet XML into a Sheet (2D array) */
function parseSheet(xml: string, sharedStrings: string[]): Sheet {
  const root = parseXml(xml);
  const sheetData = findFirst(root, "sheetData");
  if (!sheetData) return [];

  const rows: Sheet = [];

  for (const rowNode of sheetData.children) {
    if (!rowNode.tag.endsWith("row") && rowNode.tag !== "row") continue;

    const rIdx = parseInt(rowNode.attrs.r ?? "0") - 1;

    // Ensure row exists
    while (rows.length <= rIdx) rows.push([]);
    const rowArr = rows[rIdx];

    for (const cell of rowNode.children) {
      if (!cell.tag.endsWith("c") && cell.tag !== "c") continue;

      const cellRef = cell.attrs.r;
      if (!cellRef) continue;

      const { col } = parseCellRef(cellRef);
      while (rowArr.length <= col) rowArr.push(null);

      const cellType = cell.attrs.t ?? "n";
      const vNode = findFirst(cell, "v");
      const rawValue = vNode ? decodeXmlEntities(vNode.text) : null;

      if (rawValue === null) {
        rowArr[col] = null;
      } else if (cellType === "s") {
        // Shared string index
        const idx = parseInt(rawValue);
        rowArr[col] = sharedStrings[idx] ?? null;
      } else if (cellType === "str" || cellType === "inlineStr") {
        rowArr[col] = rawValue;
      } else if (cellType === "b") {
        rowArr[col] = rawValue === "1" ? 1 : 0;
      } else {
        // Numeric
        const n = parseFloat(rawValue);
        rowArr[col] = isNaN(n) ? rawValue : n;
      }
    }
  }

  return rows;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Load an XLSX file and return all sheets */
export async function loadXlsx(filePath: string): Promise<Workbook> {
  const fileData = await Deno.readFile(filePath);
  const zip = await readZip(fileData);

  // Parse shared strings
  const ssData = zip.get("xl/sharedStrings.xml");
  const sharedStrings = ssData
    ? parseSharedStrings(new TextDecoder().decode(ssData))
    : [];

  // Parse workbook to get sheet names and rIds
  const wbData = zip.get("xl/workbook.xml");
  if (!wbData) throw new Error("No xl/workbook.xml found");

  const wbRoot = parseXml(new TextDecoder().decode(wbData));
  const sheetNodes = findAll(wbRoot, "sheet");

  // Parse relationships to map rId to file path
  const relsData = zip.get("xl/_rels/workbook.xml.rels");
  const relMap = new Map<string, string>();
  if (relsData) {
    const relsRoot = parseXml(new TextDecoder().decode(relsData));
    for (const rel of findAll(relsRoot, "Relationship")) {
      const id = rel.attrs.Id ?? rel.attrs.id;
      const target = rel.attrs.Target ?? rel.attrs.target;
      if (id && target) relMap.set(id, target);
    }
  }

  const workbook: Workbook = new Map();

  for (const sheetNode of sheetNodes) {
    const name = sheetNode.attrs.name ?? sheetNode.attrs.Name ?? "Sheet1";
    const rId = sheetNode.attrs["r:id"] ?? sheetNode.attrs.id ?? "";
    let target = relMap.get(rId) ?? "";
    if (!target.startsWith("xl/") && !target.startsWith("/xl/")) {
      target = `xl/${target}`;
    }

    const sheetData = zip.get(target);
    if (!sheetData) continue;

    const sheet = parseSheet(new TextDecoder().decode(sheetData), sharedStrings);
    workbook.set(name, sheet);
  }

  return workbook;
}

/** Get cell value from a sheet (0-based row and col) */
export function getCell(sheet: Sheet, row: number, col: number): CellValue {
  return sheet[row]?.[col] ?? null;
}

/** Get cell as string */
export function getCellStr(sheet: Sheet, row: number, col: number): string {
  const v = getCell(sheet, row, col);
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

/** Get cell as number, returns NaN if not a number */
export function getCellNum(sheet: Sheet, row: number, col: number): number {
  const v = getCell(sheet, row, col);
  if (typeof v === "number") return v;
  if (typeof v === "string") return parseFloat(v);
  return NaN;
}
