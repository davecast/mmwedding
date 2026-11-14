import type { RsvpRecord } from "./rsvp-schema";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Sends the RSVP to the couple through the Resend REST API.
 * Needs RESEND_API_KEY, RESEND_FROM and RSVP_TO_EMAIL (see .env.example).
 */
export async function sendRsvpEmail(r: RsvpRecord): Promise<{ sent: boolean; reason?: string }> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.RSVP_TO_EMAIL;
  const from = process.env.RESEND_FROM ?? "Boda <onboarding@resend.dev>";
  if (!key || !to) return { sent: false, reason: "RESEND_API_KEY or RSVP_TO_EMAIL is not set" };

  const answer = r.attend === "yes" ? "Sí asistirá" : "No podrá asistir";
  const when = new Date(r.createdAt).toLocaleString("es-VE", { dateStyle: "long", timeStyle: "short" });

  const text = [`Nueva confirmación de asistencia`, ``, `Nombre: ${r.name}`, `Asistencia: ${answer}`, `Palabras de bendición: ${r.blessing}`, ``, `Recibido: ${when}`].join("\n");
  const html = `
    <div style="font-family:Georgia,serif;max-width:520px;margin:auto;color:#242d43">
      <h2 style="color:#815e3e;margin:0 0 16px">Nueva confirmación de asistencia</h2>
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        <tr><td style="padding:8px 0;color:#815e3e;width:150px">Nombre</td><td>${esc(r.name)}</td></tr>
        <tr><td style="padding:8px 0;color:#815e3e">Asistencia</td><td><strong>${answer}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#815e3e;vertical-align:top">Palabras de bendición</td><td style="white-space:pre-wrap">${esc(r.blessing)}</td></tr>
      </table>
      <p style="color:#8a8a8a;font-size:12px;margin-top:24px">Recibido: ${esc(when)}</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: to.split(",").map((s) => s.trim()).filter(Boolean), subject: `${r.attend === "yes" ? "✓" : "✗"} ${r.name} — confirmación de asistencia`, html, text }),
  });
  if (!res.ok) return { sent: false, reason: `Resend responded ${res.status}: ${await res.text()}` };
  return { sent: true };
}
