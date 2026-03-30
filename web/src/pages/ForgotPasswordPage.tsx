import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase.ts";

export function ForgotPasswordPage() {
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    });

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-9 h-9 bg-brand-800 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">SII</span>
          </div>
          <div>
            <div className="text-lg font-bold text-stone-900 leading-tight">Plataforma Tributaria</div>
            <div className="text-xs text-stone-400">Formulario 22 AT2026</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
          <h1 className="text-xl font-semibold text-stone-900 mb-1">Recuperar contraseña</h1>
          <p className="text-sm text-stone-500 mb-6">
            Te enviamos un link para crear una nueva contraseña.
          </p>

          {sent ? (
            <div className="px-3 py-3 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700">
              <p className="font-medium mb-1">Revisa tu correo</p>
              <p>Enviamos un link a <strong>{email}</strong>. Haz clic en él para restablecer tu contraseña.</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 px-3 py-2.5 bg-danger-500/10 border border-danger-500/20 rounded-lg text-sm text-danger-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                      focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400
                      placeholder:text-stone-400"
                    placeholder="tu@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300
                    text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
                >
                  {loading ? "Enviando…" : "Enviar link"}
                </button>
              </form>
            </>
          )}

          <p className="mt-6 text-center text-sm text-stone-500">
            <Link to="/login" className="text-brand-600 hover:text-brand-700 font-medium">
              Volver al inicio de sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
