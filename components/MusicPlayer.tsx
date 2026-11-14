"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useLoaderReady } from "./loader";
import { getAudio, isOptedOut, setOptedOut, tryPlay } from "./music";

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 9.5v5h3.5l5 4v-13l-5 4z" />
      {on ? <path d="M16 9a4.2 4.2 0 0 1 0 6M18.6 6.5a8 8 0 0 1 0 11" /> : <path d="M16.5 9.5l5 5M21.5 9.5l-5 5" />}
    </svg>
  );
}

function subscribe(cb: () => void) {
  const a = getAudio();
  if (!a) return () => {};
  a.addEventListener("play", cb);
  a.addEventListener("pause", cb);
  return () => {
    a.removeEventListener("play", cb);
    a.removeEventListener("pause", cb);
  };
}

/**
 * Round button that pauses and resumes the background song. The song itself is started
 * by the loading screen (see Preloader); this also covers the rare case where that was
 * skipped, by starting on the first tap, click or key press.
 */
export function MusicPlayer() {
  const ready = useLoaderReady();
  const playing = useSyncExternalStore(subscribe, () => !getAudio()?.paused, () => false);

  // Safety net: if the page opened without the song starting, begin on the first gesture
  useEffect(() => {
    if (!ready) return;
    const a = getAudio();
    if (!a || !a.paused || isOptedOut()) return;
    const events = ["pointerdown", "keydown", "touchend"] as const;
    const onGesture = () => {
      tryPlay().then((ok) => {
        if (ok) off();
      });
    };
    const off = () => events.forEach((e) => window.removeEventListener(e, onGesture));
    events.forEach((e) => window.addEventListener(e, onGesture, { passive: true }));
    return off;
  }, [ready]);

  // One tab plays at a time, and nothing keeps playing after the page is closed
  useEffect(() => {
    const a = getAudio();
    if (!a) return;
    const ch = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("mm-music") : null;
    const announce = () => ch?.postMessage("playing");
    const yieldToOther = () => a.pause();
    a.addEventListener("play", announce);
    ch?.addEventListener("message", yieldToOther);
    window.addEventListener("pagehide", yieldToOther);
    return () => {
      a.removeEventListener("play", announce);
      ch?.removeEventListener("message", yieldToOther);
      window.removeEventListener("pagehide", yieldToOther);
      ch?.close();
      a.pause(); // leaving the home page (e.g. to the photo page) stops the song
    };
  }, []);

  const toggle = () => {
    const a = getAudio();
    if (!a) return;
    if (a.paused) {
      setOptedOut(false);
      tryPlay();
    } else {
      a.pause();
      setOptedOut(true);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Pausar la música de fondo" : "Reproducir la música de fondo"}
      className="fixed bottom-5 right-5 z-[60] grid size-12 cursor-pointer place-items-center rounded-full bg-deep text-on-deep shadow-[0_14px_30px_-10px_rgb(0_0_0/0.55)] ring-1 ring-line-deep/60 transition-transform duration-150 ease-out hover:scale-105 active:scale-95 max-sm:bottom-4 max-sm:right-4"
    >
      <SoundIcon on={playing} />
    </button>
  );
}
