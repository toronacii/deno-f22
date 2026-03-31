import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase.ts";
import { Logo } from "../components/ui/Logo.tsx";

const VALID_PLANS   = ["f22digital", "genesis", "sinergy", "momentum", "horizon"];
const VALID_BILLING = ["monthly", "annual"];

export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const preselectedPlan    = searchParams.get("plan");
  const preselectedBilling = searchParams.get("billing");
  const validPlan    = preselectedPlan    && VALID_PLANS.includes(preselectedPlan)    ? preselectedPlan    : null;
  const validBilling = preselectedBilling && VALID_BILLING.includes(preselectedBilling) ? preselectedBilling : null;

  function buildCallbackUrl() {
    const params = new URLSearchParams();
    if (validPlan)    params.set("plan",    validPlan);
    if (validBilling) params.set("billing", validBilling);
    const qs = params.toString();
    return qs
      ? `${window.location.origin}/auth/callback?${qs}`
      : `${window.location.origin}/auth/callback`;
  }

  function buildOnboardingPath() {
    const params = new URLSearchParams();
    if (validPlan)    params.set("plan",    validPlan);
    if (validBilling) params.set("billing", validBilling);
    const qs = params.toString();
    return qs ? `/onboarding?${qs}` : "/onboarding";
  }

  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [error,       setError]       = useState<string | null>(null);
  const [loading,     setLoading]     = useState(false);
  const [needsConfirm, setNeedsConfirm] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Sign out any existing session so the new account gets a fresh start
    await supabase.auth.signOut();

    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: buildCallbackUrl(),
      },
    });

    if (err) {
      setError(err.message);
      setLoading(false);
    } else if (data.session) {
      // Auto-login (email confirmation disabled) — go straight to onboarding
      navigate(buildOnboardingPath(), { replace: true });
    } else {
      // Email confirmation required — show message, don't navigate
      setNeedsConfirm(true);
      setLoading(false);
    }
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: buildCallbackUrl() },
    });
  }

  return (
    <div className="min-h-[100dvh] bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo className="h-10 w-auto" />
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
          <h1 className="text-xl font-semibold text-stone-900 mb-1">Crear cuenta</h1>
          <p className="text-sm text-stone-500 mb-6">Solo necesitas tu correo — los RUTs los agregas después.</p>

          {needsConfirm && (
            <div className="mb-4 px-3 py-3 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700">
              <p className="font-medium mb-1">Revisa tu correo</p>
              <p>Enviamos un link de confirmación a <strong>{email}</strong>. Haz clic en él para activar tu cuenta.</p>
            </div>
          )}

          {error && (
            <div className="mb-4 px-3 py-2.5 bg-danger-500/10 border border-danger-500/20 rounded-lg text-sm text-danger-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={`space-y-4 ${needsConfirm ? "opacity-50 pointer-events-none" : ""}`}>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400
                  placeholder:text-stone-400"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400
                  placeholder:text-stone-400"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300
                text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
            >
              {loading ? "Creando cuenta…" : "Crear cuenta"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400">o continuar con</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-2 border border-stone-200
              rounded-lg py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          <p className="mt-6 text-center text-sm text-stone-500">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-brand-600 hover:text-brand-700 font-medium">
              Ingresar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
