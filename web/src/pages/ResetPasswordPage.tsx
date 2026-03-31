import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.ts";
import { Logo } from "../components/ui/Logo.tsx";

export function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password,  setPassword]  = useState("");
  const [confirm,   setConfirm]   = useState("");
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const { error: err } = await supabase.auth.updateUser({ password });

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      // Sign out so the user logs in fresh with the new password
      await supabase.auth.signOut();
      navigate("/login?reset=ok", { replace: true });
    }
  }

  return (
    <div className="min-h-[100dvh] bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo className="h-10 w-auto" />
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
          <h1 className="text-xl font-semibold text-stone-900 mb-1">Nueva contraseña</h1>
          <p className="text-sm text-stone-500 mb-6">Elige una contraseña segura de al menos 8 caracteres.</p>

          {error && (
            <div className="mb-4 px-3 py-2.5 bg-danger-500/10 border border-danger-500/20 rounded-lg text-sm text-danger-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Nueva contraseña
              </label>
              <input
                type="password"
                required
                autoFocus
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Confirmar contraseña
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                placeholder="Repite la contraseña"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300
                text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
            >
              {loading ? "Guardando…" : "Guardar contraseña"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
