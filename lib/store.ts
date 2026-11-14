import { randomUUID } from "node:crypto";
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Blessing, RsvpInput, RsvpRecord } from "./rsvp-schema";

/*
 * Where RSVP answers (and the blessings shown in the carousel) are kept.
 *
 *  - Vercel / production: set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN (or the
 *    KV_REST_API_URL / KV_REST_API_TOKEN that Vercel KV adds). Answers live in a Redis list.
 *  - Local development: with those unset, answers go to ./data/rsvps.json (what the carousel
 *    reads) and ./data/rsvps.csv (a spreadsheet-friendly log).
 *
 * Vercel's disk is read-only and wiped between requests, so without Redis a deployed site can
 * only keep answers in /tmp for as long as that server instance stays warm.
 */

const REDIS_KEY = "mm:rsvps";
// Vercel adds these as KV_REST_API_URL / KV_REST_API_TOKEN, or with a prefix you chose
// (for example STORAGE_KV_REST_API_URL), so accept any name that ends the same way.
const envEnding = (suffix: string) => {
  const key = Object.keys(process.env).find((k) => k.endsWith(suffix) && process.env[k]);
  return key ? process.env[key] : undefined;
};
const redisUrl = () => process.env.UPSTASH_REDIS_REST_URL || envEnding("REST_API_URL");
const redisToken = () => process.env.UPSTASH_REDIS_REST_TOKEN || envEnding("REST_API_TOKEN");
const hasRedis = () => Boolean(redisUrl() && redisToken());

async function redis<T>(command: (string | number)[]): Promise<T> {
  const res = await fetch(redisUrl()!, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis responded ${res.status}`);
  const json = (await res.json()) as { result: T; error?: string };
  if (json.error) throw new Error(json.error);
  return json.result;
}

// ---- local files -----------------------------------------------------------------------------

const dataDir = () => (process.env.VERCEL ? "/tmp/mmwedding" : path.join(process.cwd(), "data"));
const jsonFile = () => path.join(dataDir(), "rsvps.json");
const csvFile = () => path.join(dataDir(), "rsvps.csv");

// Serialise writes so two simultaneous answers cannot overwrite each other.
let queue: Promise<unknown> = Promise.resolve();
const exclusive = <T>(job: () => Promise<T>) => {
  const run = queue.then(job, job);
  queue = run.catch(() => undefined);
  return run;
};

async function readAll(): Promise<RsvpRecord[]> {
  try {
    return JSON.parse(await readFile(jsonFile(), "utf8")) as RsvpRecord[];
  } catch {
    return [];
  }
}

const csvCell = (v: string) => `"${v.replace(/"/g, '""')}"`;

async function saveLocal(record: RsvpRecord) {
  await exclusive(async () => {
    await mkdir(dataDir(), { recursive: true });
    const all = await readAll();
    all.push(record);
    await writeFile(jsonFile(), JSON.stringify(all, null, 2), "utf8");

    let header = "";
    try {
      await readFile(csvFile());
    } catch {
      header = "id,fecha,nombre,asistencia,palabras_de_bendicion\n";
    }
    const row = [record.id, record.createdAt, record.name, record.attend === "yes" ? "Sí" : "No", record.blessing].map(csvCell).join(",");
    await appendFile(csvFile(), `${header}${row}\n`, "utf8");
  });
}

// ---- public API ------------------------------------------------------------------------------

export async function saveRsvp(input: RsvpInput): Promise<RsvpRecord> {
  const record: RsvpRecord = { id: randomUUID(), createdAt: new Date().toISOString(), ...input };
  if (hasRedis()) await redis(["LPUSH", REDIS_KEY, JSON.stringify(record)]);
  else await saveLocal(record);
  return record;
}

/** Newest first. */
export async function listBlessings(limit = 30): Promise<Blessing[]> {
  let records: RsvpRecord[];
  if (hasRedis()) {
    const rows = await redis<string[]>(["LRANGE", REDIS_KEY, 0, 199]);
    records = rows.map((r) => JSON.parse(r) as RsvpRecord);
  } else {
    records = (await readAll()).reverse();
  }
  return records
    .filter((r) => r.blessing)
    .slice(0, limit)
    .map(({ id, name, attend, blessing, createdAt }) => ({ id, name, attend, blessing, createdAt }));
}

export const storageMode = () => (hasRedis() ? "redis" : process.env.VERCEL ? "tmp (not durable)" : "local file");
