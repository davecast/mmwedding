/** Shared by the form (client) and the API (server) so both enforce the same rules. */

export const LIMITS = {
  name: { min: 2, max: 80 },
  blessing: { min: 3, max: 500 },
} as const;

export type Attend = "yes" | "no";

export type RsvpInput = {
  name: string;
  attend: Attend;
  blessing: string;
};

export type RsvpRecord = RsvpInput & {
  id: string;
  createdAt: string; // ISO date
};

export type Blessing = Pick<RsvpRecord, "id" | "name" | "attend" | "blessing" | "createdAt">;

export type Validation = { ok: true; data: RsvpInput } | { ok: false; errors: Partial<Record<keyof RsvpInput, string>> };

const clean = (v: unknown) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim() : "");

export function validateRsvp(raw: unknown): Validation {
  const body = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const name = clean(body.name);
  const blessing = typeof body.blessing === "string" ? body.blessing.replace(/\r\n/g, "\n").trim() : "";
  const attend = body.attend;
  const errors: Partial<Record<keyof RsvpInput, string>> = {};

  if (name.length < LIMITS.name.min) errors.name = "Escribe tu nombre.";
  else if (name.length > LIMITS.name.max) errors.name = `Máximo ${LIMITS.name.max} caracteres.`;

  if (attend !== "yes" && attend !== "no") errors.attend = "Indica si nos acompañarás.";

  if (blessing.length < LIMITS.blessing.min) errors.blessing = "Escribe unas palabras de bendición.";
  else if (blessing.length > LIMITS.blessing.max) errors.blessing = `Máximo ${LIMITS.blessing.max} caracteres.`;

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { name, attend: attend as Attend, blessing } };
}
