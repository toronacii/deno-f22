/**
 * AccountTopBar — header para páginas de nivel cuenta y workspace.
 * NO es el header del editor F22 (ese es TopBar.tsx).
 * Muestra: logo | breadcrumb opcional | avatar + menú
 */

import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth_context.tsx";

interface Props {
  /** Contexto activo del RUT (para páginas nivel workspace) */
  rutContext?: {
    id:   string;
    rut:  string;
    name: string;
  };
  /** Otros RUTs disponibles (para el selector) */
  otherRuts?: { id: string; rut: string; name: string }[];
}

export function AccountTopBar({ rutContext, otherRuts }: Props) {
  const { user, signOut }   = useAuth();
  const navigate             = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [rutOpen,  setRutOpen]  = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const rutRef  = useRef<HTMLDivElement>(null);

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (rutRef.current  && !rutRef.current.contains(e.target as Node))  setRutOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = (user?.user_metadata?.full_name ?? user?.email ?? "U")
    .split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();

  return (
    <header className="bg-white border-b border-stone-200 shrink-0 px-4 md:px-6 h-14 flex items-center gap-3">
      {/* Logo */}
      <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0 mr-2">
        <div className="w-7 h-7 bg-brand-800 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">SII</span>
        </div>
        <span className="text-sm font-bold text-stone-900 hidden sm:block">F22</span>
      </Link>

      {/* Separador + contexto RUT */}
      {rutContext && (
        <>
          <span className="text-stone-300 hidden sm:block">/</span>

          {/* Selector de RUT activo */}
          <div ref={rutRef} className="relative">
            <button
              onClick={() => setRutOpen(!rutOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors max-w-[220px]"
            >
              <div className="text-left min-w-0">
                <div className="text-xs font-mono text-stone-400 leading-none truncate">{rutContext.rut}</div>
                <div className="text-sm font-medium text-stone-900 leading-tight truncate">{rutContext.name}</div>
              </div>
              <svg className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${rutOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            {rutOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-stone-200 rounded-xl shadow-lg py-1 z-50">
                {/* Activo */}
                <div className="px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-600 rounded-full shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-stone-400 truncate">{rutContext.rut}</div>
                    <div className="text-sm font-medium text-stone-900 truncate">{rutContext.name}</div>
                  </div>
                </div>

                {/* Otros RUTs */}
                {otherRuts && otherRuts.length > 0 && (
                  <>
                    <div className="h-px bg-stone-100 mx-2 my-1" />
                    {otherRuts.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => { navigate(`/rut/${r.id}`); setRutOpen(false); }}
                        className="w-full text-left px-3 py-2 hover:bg-stone-50 transition-colors"
                      >
                        <div className="text-xs font-mono text-stone-400 truncate">{r.rut}</div>
                        <div className="text-sm text-stone-700 truncate">{r.name}</div>
                      </button>
                    ))}
                  </>
                )}

                <div className="h-px bg-stone-100 mx-2 my-1" />
                <Link
                  to="/dashboard"
                  onClick={() => setRutOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-stone-500 hover:bg-stone-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Todos los contribuyentes
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      <div className="flex-1" />

      {/* Avatar + menú */}
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-8 h-8 bg-brand-700 rounded-full flex items-center justify-center
            text-white text-xs font-bold hover:bg-brand-800 transition-colors"
        >
          {initials}
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-stone-200 rounded-xl shadow-lg py-1 z-50">
            <div className="px-3 py-2 border-b border-stone-100">
              <div className="text-xs font-medium text-stone-900 truncate">
                {user?.user_metadata?.full_name ?? user?.email}
              </div>
              <div className="text-xs text-stone-400 truncate">{user?.email}</div>
            </div>
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            <button
              onClick={() => { signOut(); navigate("/login"); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-danger-600 hover:bg-danger-500/8 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
