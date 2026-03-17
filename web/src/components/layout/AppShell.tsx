/**
 * Main application shell.
 * Three-column layout: sidebar | form | right panel
 */

import { useState } from "react";
import { TopBar } from "./TopBar.tsx";
import { Sidebar } from "./Sidebar.tsx";
import { F22Form } from "../form/F22Form.tsx";
import { ValidationPanel } from "../panels/ValidationPanel.tsx";
import { OptimizationPanel } from "../panels/OptimizationPanel.tsx";
import { useFormStore } from "../../store/form_store.ts";

type RightPanelTab = "validation" | "optimization";

export function AppShell() {
  const [rightTab, setRightTab] = useState<RightPanelTab>("validation");
  const violations = useFormStore((s) => s.violations);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-56 shrink-0 border-r border-gray-200 bg-white overflow-y-auto px-2">
          <Sidebar />
        </div>

        {/* Main form area */}
        <main className="flex-1 overflow-y-auto px-6 py-5">
          <F22Form />
        </main>

        {/* Right panel */}
        <aside className="w-72 shrink-0 border-l border-gray-200 bg-white flex flex-col overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-gray-200 shrink-0">
            <button
              onClick={() => setRightTab("validation")}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                rightTab === "validation"
                  ? "border-b-2 border-blue-600 text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Validación
              {violations.length > 0 && (
                <span className="ml-1 bg-red-500 text-white rounded-full text-xs px-1.5">
                  {violations.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setRightTab("optimization")}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                rightTab === "optimization"
                  ? "border-b-2 border-amber-500 text-amber-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              💡 Optimizar
            </button>
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto p-3">
            {rightTab === "validation" ? (
              <ValidationPanel />
            ) : (
              <OptimizationPanel />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
