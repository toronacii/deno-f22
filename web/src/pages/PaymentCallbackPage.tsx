/**
 * PaymentCallbackPage — landing después del registro de tarjeta o pago F22 en Flow.
 *
 * Query params:
 *   ?status=success|error
 *   &type=f22            (solo para pagos únicos F22)
 *   &returnTo=/dashboard (solo para flujo de tarjeta en onboarding)
 *   &reason=<código>     (solo en error)
 */

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Logo } from "../components/ui/Logo.tsx";

export function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate       = useNavigate();
  const queryClient    = useQueryClient();
  const [message, setMessage] = useState("Procesando pago…");

  const status   = searchParams.get("status");
  const type     = searchParams.get("type");
  const returnTo = searchParams.get("returnTo") ?? (type === "f22" ? "/dashboard" : "/account");
  const reason   = searchParams.get("reason");

  useEffect(() => {
    async function complete() {
      if (status === "success") {
        setMessage("¡Pago exitoso! Configurando tu cuenta…");
        // Invalidate portal so AuthGuard re-checks payment status with fresh DB data
        await queryClient.invalidateQueries({ queryKey: ["portal"] });
        navigate(returnTo, { replace: true });
      } else {
        const errorMessages: Record<string, string> = {
          card_declined:     "Tu tarjeta fue rechazada. Intenta con otra.",
          missing_params:    "Enlace de pago inválido.",
          plan_not_found:    "El plan seleccionado ya no está disponible.",
          profile_not_found: "No se encontró tu perfil. Contacta soporte.",
          flow_error:        "Error al procesar el pago con Flow.",
          server_error:      "Error interno. Intenta nuevamente.",
        };
        const msg = reason ? (errorMessages[reason] ?? "Error desconocido.") : "Pago cancelado.";
        setMessage(msg);
        setTimeout(() => navigate(`/onboarding`, { replace: true }), 3000);
      }
    }
    complete();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[100dvh] bg-stone-50 flex flex-col items-center justify-center px-4">
      <Logo className="h-8 w-auto mb-8" />

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm px-8 py-10 max-w-sm w-full text-center">
        {status === "success" ? (
          <>
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-stone-900 mb-2">
              {type === "f22" ? "Pago recibido" : "Suscripción activada"}
            </h1>
            <p className="text-sm text-stone-500">{message}</p>
            <div className="mt-4 flex justify-center">
              <div className="w-5 h-5 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-stone-900 mb-2">Problema con el pago</h1>
            <p className="text-sm text-stone-500">{message}</p>
            <p className="text-xs text-stone-400 mt-3">Redirigiendo…</p>
          </>
        )}
      </div>
    </div>
  );
}
