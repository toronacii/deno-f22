/**
 * Right panel — shows validation violations with links to the offending field.
 */

import { useFormStore } from "../../store/form_store.ts";
import { Badge } from "../ui/Badge.tsx";

export function ValidationPanel() {
  const violations = useFormStore((s) => s.violations);

  function scrollToField(code: number) {
    // The field row has id="field-{code}"
    const el = document.getElementById(`field-${code}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.classList.add("ring-2", "ring-red-400");
    setTimeout(() => el?.classList.remove("ring-2", "ring-red-400"), 2000);
  }

  if (violations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <span className="text-2xl mb-2">✓</span>
        <p className="text-sm font-medium text-green-700">Todo coherente</p>
        <p className="text-xs text-gray-400 mt-1">
          Los valores declarados coinciden con los calculados
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Errores de validación
        </span>
        <Badge variant="error">{violations.length}</Badge>
      </div>

      <ul className="flex flex-col gap-1.5">
        {violations.map((v) => (
          <li
            key={`${v.ruleId}-${v.targetField}`}
            className="rounded-lg border border-red-200 bg-red-50 p-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-red-600 font-semibold">
                  [{v.targetField}]
                </p>
                <p className="text-xs text-red-700 mt-0.5 leading-snug line-clamp-3">
                  {v.message}
                </p>
              </div>
              <button
                onClick={() => scrollToField(v.targetField)}
                className="shrink-0 text-xs text-red-500 hover:text-red-700
                  underline underline-offset-2 transition-colors"
              >
                Ver
              </button>
            </div>
            {v.delta !== undefined && (
              <p className="text-xs text-red-500 mt-1 font-mono">
                Δ {new Intl.NumberFormat("es-CL").format(v.delta)}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
