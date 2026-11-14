"use client";

import { useState, type FormEvent } from "react";
import { LIMITS, type RsvpInput } from "@/lib/rsvp-schema";

export const BLESSINGS_UPDATED = "mm-blessings-updated";

const field =
  "w-full border-b border-line/50 bg-transparent px-1 py-3 text-sm outline-none placeholder:text-ink/65 transition-colors focus:border-heading aria-[invalid=true]:border-red-500";

type Status = "idle" | "sending" | "done" | "error";
type Errors = Partial<Record<keyof RsvpInput, string>>;

/** Native validation, in Spanish. */
const required = {
  onInvalid: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => e.currentTarget.setCustomValidity("Este campo es obligatorio."),
  onInput: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => e.currentTarget.setCustomValidity(""),
};

/** A radio group is valid or invalid as a whole, so clear every option's message together. */
const radio = {
  onInvalid: required.onInvalid,
  onInput: (e: FormEvent<HTMLInputElement>) => {
    const group = e.currentTarget.form?.elements.namedItem(e.currentTarget.name);
    if (group instanceof RadioNodeList) group.forEach((r) => (r as HTMLInputElement).setCustomValidity(""));
    else e.currentTarget.setCustomValidity("");
  },
};

export function RsvpForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [guest, setGuest] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      attend: String(data.get("attend") ?? ""),
      blessing: String(data.get("blessing") ?? ""),
      website: String(data.get("website") ?? ""), // honeypot
    };

    setStatus("sending");
    setErrors({});
    setMessage("");
    try {
      const res = await fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: Errors };
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? {});
        setMessage(json.message ?? "No pudimos enviar tu respuesta. Inténtalo de nuevo.");
        setStatus("error");
        return;
      }
      setGuest(payload.name);
      form.reset();
      setStatus("done");
      window.dispatchEvent(new Event(BLESSINGS_UPDATED));
    } catch {
      setMessage("No hay conexión. Revisa tu internet e inténtalo de nuevo.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="py-8 text-center">
        <p className="font-serif text-2xl text-heading">¡Gracias, {guest}!</p>
        <p className="mt-3 text-sm">Recibimos tu confirmación. Tus palabras de bendición ya aparecen entre nuestras damas y padrinos.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn mt-8 cursor-pointer">
          Enviar otra respuesta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
      <input
        className={field}
        name="name"
        placeholder="Tu nombre*"
        autoComplete="name"
        required
        minLength={LIMITS.name.min}
        maxLength={LIMITS.name.max}
        aria-label="Tu nombre"
        aria-invalid={Boolean(errors.name)}
        {...required}
      />

      <fieldset className="flex flex-wrap gap-6 text-sm" aria-invalid={Boolean(errors.attend)}>
        <legend className="sr-only">¿Asistirás?</legend>
        <label className="flex items-center gap-2">
          <input type="radio" name="attend" value="yes" className="accent-heading" required {...radio} /> Sí, asistiré.
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="attend" value="no" className="accent-heading" required {...radio} /> Lo siento, no puedo ir.
        </label>
      </fieldset>

      <div>
        <textarea
          className={field}
          name="blessing"
          rows={4}
          placeholder="Palabras de bendición*"
          aria-label="Palabras de bendición"
          required
          minLength={LIMITS.blessing.min}
          maxLength={LIMITS.blessing.max}
          aria-invalid={Boolean(errors.blessing)}
          {...required}
        />
        <p className="mt-1 text-xs text-ink/70">Se mostrarán en nuestra página, entre las damas de honor y los padrinos.</p>
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No llenar este campo
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="text-center text-sm text-red-500">
          {message}
        </p>
      )}

      <div className="text-center">
        <button type="submit" className="btn cursor-pointer disabled:cursor-wait disabled:opacity-60" disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Enviar"}
        </button>
      </div>
    </form>
  );
}
