const KEY = "mm-music";
let el: HTMLAudioElement | null = null;

/** One shared audio element for the whole page (created on first use, client only). */
export function getAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!el) {
    el = new Audio("/music.mp3");
    el.loop = true;
    el.volume = 0.5;
    el.preload = "auto";
  }
  return el;
}

/*
 * A pause only lasts for the current visit: every new visit starts with the music on.
 * (An earlier version remembered the pause across visits; clear that old value.)
 */
let pausedByVisitor = false;
if (typeof window !== "undefined") {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
}

/** True when the visitor paused the music on purpose during this visit. */
export function isOptedOut() {
  return pausedByVisitor;
}

export function setOptedOut(off: boolean) {
  pausedByVisitor = off;
}

/** Resolves true if playback started, false if the browser blocked it or it was opted out. */
export function tryPlay(): Promise<boolean> {
  const a = getAudio();
  if (!a || isOptedOut()) return Promise.resolve(false);
  return a.play().then(
    () => true,
    () => false,
  );
}
