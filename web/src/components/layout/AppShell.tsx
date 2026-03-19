/**
 * Main application shell — responsive.
 *
 * Desktop (lg+):  sidebar | form | right-panel   (3 columns)
 * Mobile/tablet:  form full-width
 *                 bottom toolbar → opens sidebar drawer or panel sheet
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
  const [rightTab,     setRightTab]     = useState<RightPanelTab>("validation");
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [panelOpen,    setPanelOpen]    = useState(false);
  const violations = useFormStore((s) => s.violations);

  function openPanel(tab: RightPanelTab) {
    setRightTab(tab);
    setPanelOpen(true);
  }

  const panelContent = rightTab === "validation" ? <ValidationPanel /> : <OptimizationPanel />;

  return (
    <div className="flex flex-col h-[100dvh] bg-gray-50 overflow-hidden">
      <TopBar onMenuClick={() => setSidebarOpen(true)} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Desktop sidebar */}
        <div className="hidden lg:flex w-56 shrink-0 border-r border-gray-200 bg-white overflow-y-auto px-2">
          <Sidebar />
        </div>

        {/* Main form — extra bottom padding on mobile so bottom toolbar doesn't cover content */}
        <main className="flex-1 overflow-y-auto px-3 md:px-6 py-4 md:py-5 pb-20 lg:pb-5">
          <F22Form />
        </main>

        {/* Desktop right panel */}
        <aside className="hidden lg:flex w-72 shrink-0 border-l border-gray-200 bg-white flex-col overflow-hidden">
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
          <div className="flex-1 overflow-y-auto p-3">
            {panelContent}
          </div>
        </aside>
      </div>

      {/* ── Mobile bottom toolbar ── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex z-30 safe-area-pb">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-gray-500 hover:text-gray-800 active:bg-gray-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-[10px]">Secciones</span>
        </button>

        <button
          onClick={() => openPanel("validation")}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 active:bg-gray-50 ${
            violations.length > 0 ? "text-red-500" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <span className="relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {violations.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
                {violations.length > 9 ? "9+" : violations.length}
              </span>
            )}
          </span>
          <span className="text-[10px]">Validar</span>
        </button>

        <button
          onClick={() => openPanel("optimization")}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-amber-500 hover:text-amber-600 active:bg-gray-50"
        >
          <span className="text-[22px] leading-none">💡</span>
          <span className="text-[10px]">Optimizar</span>
        </button>
      </nav>

      {/* ── Mobile sidebar drawer ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 max-w-[80vw] h-full bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
              <span className="font-semibold text-gray-800 text-sm">Secciones del F22</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-2 py-1">
              <Sidebar onNavigate={() => setSidebarOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile panel bottom sheet ── */}
      {panelOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setPanelOpen(false)} />
          <div className="relative bg-white rounded-t-2xl shadow-2xl flex flex-col max-h-[82vh]">
            {/* Drag handle */}
            <div className="flex justify-center pt-2.5 pb-1 shrink-0">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 shrink-0">
              <button
                onClick={() => setRightTab("validation")}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  rightTab === "validation"
                    ? "border-b-2 border-blue-600 text-blue-700"
                    : "text-gray-500"
                }`}
              >
                Validación
                {violations.length > 0 && (
                  <span className="ml-1.5 bg-red-500 text-white rounded-full text-xs px-1.5">
                    {violations.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setRightTab("optimization")}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  rightTab === "optimization"
                    ? "border-b-2 border-amber-500 text-amber-700"
                    : "text-gray-500"
                }`}
              >
                💡 Optimizar
              </button>
              <button
                onClick={() => setPanelOpen(false)}
                className="px-4 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Content */}
            <div className="overflow-y-auto p-4 flex-1">
              {panelContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
