/**
 * AuthGuard — protege rutas que requieren autenticación y pago activo.
 *
 * Sin sesión          → /login
 * Sin plan activo     → /onboarding  (verifica contra el servidor, no metadata)
 * Con plan activo     → renderiza children
 *
 * El estado de pago se cachea 5 minutos vía React Query (queryKey: ["portal"]).
 * Para forzar un re-check tras un pago exitoso, invalidar ["portal"] con useQueryClient().
 */

import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../lib/auth_context.tsx";
import { api } from "../../lib/api.ts";
import type { ReactNode } from "react";

interface PortalData {
  subscription: unknown | null;
  hasF22: boolean;
}

interface Props {
  children: ReactNode;
  requireOnboarding?: boolean; // default true
}

const Spinner = () => (
  <div className="h-[100dvh] flex items-center justify-center bg-stone-50">
    <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

export function AuthGuard({ children, requireOnboarding = true }: Props) {
  const { user, session, loading } = useAuth();
  const location = useLocation();

  // Check real payment status from server — only when user is authenticated
  // and this route requires an active plan.
  const { data: portalData, isLoading: portalLoading } = useQuery<PortalData>({
    queryKey:  ["portal"],
    queryFn:   () => api.get<PortalData>("/payments/portal", { silent: true }),
    enabled:   !!user && !!session && requireOnboarding,
    staleTime: 5 * 60 * 1000,  // treat as fresh for 5 min
    retry:     false,
  });

  // ── Auth loading ──────────────────────────────────────────────────────────
  if (loading) return <Spinner />;

  // ── Not authenticated ─────────────────────────────────────────────────────
  if (!user || !session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ── Payment gate ──────────────────────────────────────────────────────────
  if (requireOnboarding) {
    // Wait for portal check before deciding
    if (portalLoading) return <Spinner />;

    const hasPaidAccess = portalData?.subscription != null || portalData?.hasF22 === true;

    if (!hasPaidAccess) {
      return <Navigate to="/onboarding" replace />;
    }
  }

  return <>{children}</>;
}
