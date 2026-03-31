/**
 * AuthCallbackPage — landing page para links de Supabase (confirm email, magic link).
 * Supabase redirige aquí con #access_token=... en el hash.
 * Esta página espera que el cliente Supabase procese los tokens,
 * luego redirige al destino correcto según el estado de onboarding.
 */

import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase.ts";

const VALID_PLANS   = ["f22digital", "genesis", "sinergy", "momentum", "horizon"];
const VALID_BILLING = ["monthly", "annual"];

export function AuthCallbackPage() {
  const navigate      = useNavigate();
  const handled       = useRef(false);
  const [searchParams] = useSearchParams();

  function buildDestination(onboardingDone: boolean) {
    if (onboardingDone) return "/dashboard";
    const plan    = searchParams.get("plan");
    const billing = searchParams.get("billing");
    const params  = new URLSearchParams();
    if (plan    && VALID_PLANS.includes(plan))    params.set("plan",    plan);
    if (billing && VALID_BILLING.includes(billing)) params.set("billing", billing);
    const qs = params.toString();
    return qs ? `/onboarding?${qs}` : "/onboarding";
  }

  useEffect(() => {
    function redirect(onboardingDone: boolean) {
      if (handled.current) return;
      handled.current = true;
      navigate(buildDestination(onboardingDone), { replace: true });
    }

    // onAuthStateChange detecta los tokens del hash automáticamente
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        if (handled.current) return;
        handled.current = true;
        navigate("/reset-password", { replace: true });
        return;
      }
      if (session) {
        redirect(session.user.user_metadata?.onboarding_completed === true);
      }
    });

    // También chequeamos la sesión actual por si el evento ya disparó
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        redirect(data.session.user.user_metadata?.onboarding_completed === true);
      }
    });

    // Timeout de seguridad: si en 8s no hay sesión, mandar al login
    const timeout = setTimeout(() => {
      if (!handled.current) {
        handled.current = true;
        navigate("/login", { replace: true });
      }
    }, 8000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center gap-3 bg-stone-50">
      <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-stone-400">Verificando cuenta…</p>
    </div>
  );
}
