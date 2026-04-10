/**
 * Toast system — Zustand store + UI container.
 *
 * Uso desde componentes React:
 *   import { toast } from "../lib/toast.tsx";
 *   toast.error("Algo salió mal");
 *   toast.success("Guardado correctamente");
 *
 * Uso desde módulos no-React (ej. api.ts):
 *   import { toast } from "./toast.tsx";
 *   toast.error(message);
 *
 * Montar en el árbol de componentes:
 *   <ToastContainer />   (una sola vez, en App.tsx)
 */

import { create } from "zustand";
import { useEffect, useRef, type ReactElement } from "react";

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

type ToastKind = "error" | "success" | "info";

interface ToastItem {
  id:      string;
  kind:    ToastKind;
  message: string;
}

interface ToastStore {
  toasts: ToastItem[];
  add:    (kind: ToastKind, message: string) => string;
  remove: (id: string) => void;
}

const DURATION_MS = 5000;

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (kind, message) => {
    const id = crypto.randomUUID();
    set((s) => ({ toasts: [...s.toasts, { id, kind, message }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, DURATION_MS + 300); // +300ms de margen para la animación de salida
    return id;
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

// Llamable desde cualquier lugar (incluso fuera del árbol de React)
export const toast = {
  error:   (message: string) => useToastStore.getState().add("error",   message),
  success: (message: string) => useToastStore.getState().add("success", message),
  info:    (message: string) => useToastStore.getState().add("info",    message),
};

// ---------------------------------------------------------------------------
// UI
// ---------------------------------------------------------------------------

const KIND_STYLES: Record<ToastKind, string> = {
  error:   "bg-red-600 text-white",
  success: "bg-emerald-600 text-white",
  info:    "bg-stone-800 text-white",
};

const KIND_ICON: Record<ToastKind, ReactElement> = {
  error: (
    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
        d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  success: (
    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ),
  info: (
    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
    </svg>
  ),
};

function Toast({ item, onRemove }: { item: ToastItem; onRemove: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  // Animate in
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.style.opacity    = "1";
      el.style.transform  = "translateY(0)";
    });

    // Animate out before Zustand removes it
    const timer = setTimeout(() => {
      el.style.opacity   = "0";
      el.style.transform = "translateY(8px)";
    }, DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: "translateY(8px)", transition: "opacity 200ms ease, transform 200ms ease" }}
      className={`pointer-events-auto flex items-start gap-2.5 px-4 py-3 rounded-xl shadow-lg w-full ${KIND_STYLES[item.kind]}`}
    >
      {KIND_ICON[item.kind]}
      <span className="flex-1 text-sm leading-snug">{item.message}</span>
      <button
        onClick={() => onRemove(item.id)}
        className="shrink-0 opacity-70 hover:opacity-100 transition-opacity mt-0.5"
        aria-label="Cerrar"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts, remove } = useToastStore();

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col-reverse gap-2 w-full max-w-sm pointer-events-none"
    >
      {toasts.map((t) => (
        <Toast key={t.id} item={t} onRemove={remove} />
      ))}
    </div>
  );
}
