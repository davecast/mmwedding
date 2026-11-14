"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const MAX_FILES = 10;
const MAX_BYTES = 10 * 1024 * 1024; // Cloudinary's free-plan limit per image
const MAX_SIDE = 2400;

/** Shrinks big phone photos before sending (faster upload, stays under the size limit). Falls back to the original. */
async function prepare(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
    if (scale === 1 && file.size < 3 * 1024 * 1024) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.88));
    return blob ? new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" }) : file;
  } catch {
    return file; // e.g. a format this browser can't decode: let Cloudinary handle it
  }
}

async function upload(file: File) {
  const sig = await fetch("/api/upload-signature", { method: "POST" }).then((r) => r.json());
  if (!sig.ok) throw new Error(sig.message ?? "No se pudo preparar la subida.");
  const body = new FormData();
  body.append("file", file);
  body.append("api_key", sig.apiKey);
  body.append("timestamp", String(sig.timestamp));
  body.append("tags", sig.tags);
  body.append("allowed_formats", sig.allowed_formats);
  body.append("signature", sig.signature);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, { method: "POST", body });
  if (!res.ok) throw new Error("No se pudo subir una de las fotos.");
}

export function PhotoUpload() {
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(0);
  const [error, setError] = useState("");

  function pick(list: FileList | null) {
    setError("");
    const all = Array.from(list ?? []);
    const photos = all.filter((f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name));
    const notes: string[] = [];
    if (photos.length < all.length) notes.push("Solo se pueden subir fotos; los videos y otros archivos no se incluyeron.");
    if (photos.length > MAX_FILES) notes.push(`Puedes subir hasta ${MAX_FILES} fotos a la vez. Elegimos las primeras ${MAX_FILES}.`);
    setError(notes.join(" "));
    setFiles(photos.slice(0, MAX_FILES));
  }

  async function send() {
    if (!files.length) return;
    setStatus("sending");
    setProgress(0);
    setFailed(0);
    setError("");
    let bad = 0;
    for (const original of files) {
      try {
        const file = await prepare(original);
        if (file.size > MAX_BYTES) throw new Error("too big");
        await upload(file);
      } catch {
        bad += 1;
      }
      setProgress((p) => p + 1);
    }
    setFailed(bad);
    setStatus(bad === files.length ? "idle" : "done");
    if (bad === files.length) setError("No pudimos subir tus fotos. Revisa tu conexión e inténtalo de nuevo.");
    setFiles([]);
    if (input.current) input.current.value = "";
  }

  if (status === "done") {
    return (
      <div role="status" className="py-6 text-center">
        <p className="font-serif text-2xl text-heading">¡Gracias por compartir tus fotos!</p>
        <p className="mt-3 text-sm">
          {failed ? `${failed} foto${failed > 1 ? "s" : ""} no se pudo subir. ` : ""}Tus fotos aparecerán en la galería de la boda en un momento.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button type="button" onClick={() => setStatus("idle")} className="btn cursor-pointer">Subir más fotos</button>
          <Link href="/#gallery" className="btn">Ver la galería</Link>
        </div>
      </div>
    );
  }

  const sending = status === "sending";
  return (
    <div className="space-y-6">
      <label className="flex cursor-pointer flex-col items-center gap-2 border border-dashed border-line px-6 py-12 text-center transition-colors hover:bg-card">
        <span className="font-serif text-xl text-heading">Toca para elegir tus fotos</span>
        <span className="text-xs text-ink/70">Hasta {MAX_FILES} fotos a la vez · JPG, PNG, HEIC o WebP</span>
        <input ref={input} type="file" accept="image/*,.heic,.heif" multiple className="sr-only" disabled={sending} onChange={(e) => pick(e.target.files)} />
      </label>

      {files.length > 0 && (
        <p className="text-center text-sm" aria-live="polite">
          {files.length} foto{files.length > 1 ? "s" : ""} lista{files.length > 1 ? "s" : ""} para subir
        </p>
      )}
      {error && <p role="alert" className="text-center text-sm text-red-500">{error}</p>}

      <div className="text-center">
        <button type="button" onClick={send} disabled={!files.length || sending} className="btn cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">
          {sending ? `Subiendo ${Math.min(progress + 1, files.length)} de ${files.length}…` : "Subir fotos"}
        </button>
      </div>
    </div>
  );
}
