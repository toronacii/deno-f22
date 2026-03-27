/**
 * AuthGuard — protege rutas que requieren autenticación.
 * Si no hay sesión → redirige a /login.
 * Si hay sesión pero no completó onboarding → redirige a /onboarding.
 */

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/auth_context.tsx";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  requireOnboarding?: boolean; // default true
}

export function AuthGuard({ children, requireOnboarding = true }: Props) {
  const { user, session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-stone-50">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si requiere onboarding y aún no lo completó, redirigir
  // (lo verificamos vía el campo onboarding_completed en el perfil, que
  // el API nos devuelve en GET /me — por ahora usamos metadata de Supabase)
  const onboardingDone = user.user_metadata?.onboarding_completed === true;
  if (requireOnboarding && !onboardingDone && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}
