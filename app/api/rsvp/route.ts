import { sendRsvpEmail } from "@/lib/email";
import { validateRsvp } from "@/lib/rsvp-schema";
import { saveRsvp } from "@/lib/store";


// Best-effort limiter (per server instance): 5 answers a minute from one address.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return Response.json({ ok: false, message: "Demasiados intentos. Espera un minuto." }, { status: 429 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Pretend success to bots.
  if (typeof body === "object" && body && "website" in body && (body as { website?: unknown }).website) {
    return Response.json({ ok: true });
  }

  const result = validateRsvp(body);
  if (!result.ok) return Response.json({ ok: false, errors: result.errors, message: "Revisa los campos marcados." }, { status: 400 });

  let record;
  try {
    record = await saveRsvp(result.data);
  } catch (err) {
    console.error("[rsvp] could not save", err);
    return Response.json({ ok: false, message: "No pudimos guardar tu respuesta. Inténtalo de nuevo." }, { status: 500 });
  }

  // The answer is already safe at this point; an email problem must not lose it.
  let emailed = false;
  let emailError: string | undefined;
  try {
    const mail = await sendRsvpEmail(record);
    emailed = mail.sent;
    emailError = mail.reason;
    if (!mail.sent) console.warn("[rsvp] email not sent:", mail.reason);
  } catch (err) {
    emailError = err instanceof Error ? err.message : String(err);
    console.error("[rsvp] email failed", err);
  }

  // The reason is only revealed while developing; visitors never see it.
  return Response.json({ ok: true, emailed, ...(process.env.NODE_ENV !== "production" && emailError ? { emailError } : {}) });
}
