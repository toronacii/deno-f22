/**
 * Ejecuta los scripts SQL de migración contra Supabase.
 * Uso: deno run --allow-read --allow-net --allow-env run_migrations.ts
 */

import postgres from "npm:postgres@3";

const DB_URL = Deno.env.get("SUPABASE_DB_URL") ?? buildUrl();

function buildUrl() {
  const password = encodeURIComponent(
    Deno.env.get("SUPABASE_PASSWORD") ?? "",
  );
  const ref = "vwfrkzskgaalevtkidco";
  // Try direct host first, fallback to pooler
  return `postgresql://postgres.${ref}:${password}@aws-0-us-east-1.pooler.supabase.com:5432/postgres`;
}

async function runFile(sql: postgres.Sql, filePath: string) {
  console.log(`\n▶  Executing ${filePath}...`);
  const content = await Deno.readTextFile(filePath);
  try {
    await sql.unsafe(content);
    console.log(`✓  ${filePath} OK`);
  } catch (err) {
    console.error(`✗  ${filePath} FAILED:`, (err as Error).message);
    throw err;
  }
}

const sql = postgres(DB_URL, {
  ssl: "require",
  connect_timeout: 15,
  max: 1,
});

try {
  console.log("Connecting to Supabase...");
  await sql`SELECT 1 AS ping`;
  console.log("Connected!");

  const base = new URL(".", import.meta.url).pathname;
  await runFile(sql, `${base}schema.sql`);
  await runFile(sql, `${base}seed.sql`);
  await runFile(sql, `${base}rls.sql`);

  console.log("\n✅  All migrations completed.");
} catch (err) {
  console.error("\n❌  Migration failed:", (err as Error).message);
  Deno.exit(1);
} finally {
  await sql.end();
}
