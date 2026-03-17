/**
 * React context that holds the initialized BrowserEngine.
 * Wrap the app in <EngineProvider> to make the engine available everywhere.
 */

import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { initBrowserEngine, type BrowserEngine } from "./browser_engine.ts";

const EngineCtx = createContext<BrowserEngine | null>(null);

export function EngineProvider({ children }: { children: ReactNode }) {
  const { data: engine, isLoading, error } = useQuery({
    queryKey: ["engine"],
    queryFn: () => initBrowserEngine("/api"),
    staleTime: Infinity,   // rules never change during a session
    retry: 2,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-sii-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Cargando motor de reglas F22…</p>
        </div>
      </div>
    );
  }

  if (error || !engine) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-sm">
          <p className="text-red-600 font-semibold mb-2">Error al cargar el motor</p>
          <p className="text-gray-500 text-sm">
            Asegúrate de que la API esté corriendo en{" "}
            <code className="bg-gray-100 px-1 rounded">localhost:8000</code>
          </p>
          <p className="text-gray-400 text-xs mt-2">
            {error instanceof Error ? error.message : "Error desconocido"}
          </p>
        </div>
      </div>
    );
  }

  return <EngineCtx.Provider value={engine}>{children}</EngineCtx.Provider>;
}

export function useEngine(): BrowserEngine {
  const ctx = useContext(EngineCtx);
  if (!ctx) throw new Error("useEngine must be used inside <EngineProvider>");
  return ctx;
}
