// Notificaciones por email via Resend.
// Si RESEND_API_KEY no está configurada, falla silencioso con log.

import { STATUS_LABEL } from "@/lib/format";

export type NotifyOrderParams = {
  to: string;
  folio: string;
  clientName: string;
  description: string;
  status: string;
  total: string;
};

export async function notifyOrderStatus(params: NotifyOrderParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[notify] RESEND_API_KEY no configurada — omitiendo email para ${params.folio}`);
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const label = STATUS_LABEL[params.status] ?? params.status;

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>SCA — Tu orden ${params.folio}</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 0;">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
        <!-- Header -->
        <tr>
          <td style="background:#0a0814;padding:28px 32px;text-align:center;">
            <div style="color:#E31E24;font-size:22px;font-weight:900;letter-spacing:2px;">SCA</div>
            <div style="color:#8891A8;font-size:12px;margin-top:4px;">Servicio de Marchas y Alternadores</div>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 16px;color:#0F1117;font-size:16px;">Hola <strong>${params.clientName}</strong>,</p>
            <p style="margin:0 0 24px;color:#444;font-size:14px;line-height:1.6;">
              Tu orden <strong>${params.folio}</strong> ha cambiado de estatus.
            </p>

            <!-- Status badge -->
            <div style="text-align:center;margin:24px 0;">
              <span style="display:inline-block;background:#E31E24;color:#fff;border-radius:999px;padding:10px 28px;font-size:16px;font-weight:700;">
                ${label}
              </span>
            </div>

            <!-- Details -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:10px;overflow:hidden;margin-bottom:24px;">
              <tr style="background:#f8f9fb;">
                <td style="padding:12px 16px;color:#888;font-size:12px;">FOLIO</td>
                <td style="padding:12px 16px;font-weight:700;font-size:13px;">${params.folio}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;color:#888;font-size:12px;">TRABAJO</td>
                <td style="padding:12px 16px;font-size:13px;">${params.description}</td>
              </tr>
              <tr style="background:#f8f9fb;">
                <td style="padding:12px 16px;color:#888;font-size:12px;">TOTAL</td>
                <td style="padding:12px 16px;font-weight:700;font-size:13px;">${params.total}</td>
              </tr>
            </table>

            <p style="text-align:center;">
              <a href="https://marchasalternadores.life/seguimiento?folio=${params.folio}"
                 style="display:inline-block;background:#E31E24;color:#fff;border-radius:10px;padding:12px 28px;text-decoration:none;font-weight:700;font-size:14px;">
                Ver seguimiento →
              </a>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8f9fb;padding:20px 32px;text-align:center;color:#aaa;font-size:12px;">
            San Nicolás de los Garza, N.L. · marchasalternadores.life
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: "SCA <notificaciones@marchasalternadores.life>",
      to: params.to,
      subject: `Tu orden ${params.folio} — ${label}`,
      html,
    });
    console.log(`[notify] Email enviado a ${params.to} para ${params.folio}`);
  } catch (e) {
    console.error(`[notify] Error enviando email:`, e instanceof Error ? e.message : e);
  }
}
