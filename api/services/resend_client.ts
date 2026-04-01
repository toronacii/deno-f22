/**
 * Resend email client — HTTP directo, sin SDK.
 * Docs: https://resend.com/docs/api-reference/emails/send-email
 */

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL     = Deno.env.get("RESEND_FROM_EMAIL") ?? "OC Global Services <noreply@ocglobalservices.cl>";
const TEAM_EMAILS    = (Deno.env.get("TEAM_CONTACT_EMAIL") ?? "contacto@ocglobalservices.cl")
  .split(",").map((e) => e.trim()).filter(Boolean);

export class ResendError extends Error {
  constructor(public readonly status: number, public readonly body: unknown) {
    const msg = typeof body === "object" && body !== null && "message" in body
      ? String((body as Record<string, unknown>).message)
      : JSON.stringify(body);
    super(`Resend error ${status}: ${msg}`);
    this.name = "ResendError";
  }
}

async function sendEmail(params: {
  to:      string | string[];
  subject: string;
  html:    string;
}): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn("[resend] RESEND_API_KEY no configurada — email omitido");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method:  "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify({
      from:    FROM_EMAIL,
      to:      Array.isArray(params.to) ? params.to : [params.to],
      subject: params.subject,
      html:    params.html,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ResendError(res.status, body);
  }
}

// ---------------------------------------------------------------------------
// Email específico: intención de pago manual
// ---------------------------------------------------------------------------

export async function sendContactIntentEmail(params: {
  userName:     string;
  userEmail:    string;
  phone:        string;
  planName:     string;
  billingCycle: string;
  message:      string;
}): Promise<void> {
  const { userName, userEmail, phone, planName, billingCycle, message } = params;

  const cycleLabel = billingCycle === "monthly" ? "Mensual" : "Anual";
  const date       = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" });

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="font-family: sans-serif; color: #1c1917; background: #fafaf9; padding: 32px;">
  <div style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 12px;
              border: 1px solid #e7e5e4; padding: 32px;">

    <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #78716c;
                text-transform: uppercase; margin-bottom: 20px;">
      OC Global Services — Intención de pago
    </div>

    <h1 style="margin: 0 0 6px; font-size: 20px; color: #1c1917;">
      Nueva solicitud de contacto
    </h1>
    <p style="margin: 0 0 28px; font-size: 14px; color: #78716c;">
      Un usuario quiere contratar un plan y necesita asistencia para completar el pago.
    </p>

    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; color: #78716c; width: 38%;">Nombre</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; font-weight: 500;">${userName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; color: #78716c;">Email</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4;">
          <a href="mailto:${userEmail}" style="color: #292524;">${userEmail}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; color: #78716c;">Teléfono</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; font-weight: 600; font-size: 15px;">
          <a href="tel:${phone}" style="color: #292524;">${phone}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; color: #78716c;">Plan</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; font-weight: 500;">
          ${planName} — ${cycleLabel}
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #78716c; vertical-align: top;">Mensaje</td>
        <td style="padding: 10px 0; font-style: italic; color: #57534e;">"${message}"</td>
      </tr>
    </table>

    <div style="margin-top: 28px; padding: 12px 16px; background: #fef3c7; border-radius: 8px;
                font-size: 13px; color: #92400e; border: 1px solid #fde68a;">
      Contactar lo antes posible para no perder la conversión.
    </div>

    <div style="margin-top: 24px; font-size: 12px; color: #a8a29e;">
      Recibido el ${date}
    </div>
  </div>
</body>
</html>
  `.trim();

  await sendEmail({
    to:      TEAM_EMAILS,
    subject: `Nueva intención de pago — ${planName} (${cycleLabel}) — ${userName}`,
    html,
  });
}
