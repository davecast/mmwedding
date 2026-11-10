import { useSyncExternalStore } from "react";

let ready = false;
const subs = new Set<() => void>();

/** Called once by the preloader when the page is ready to be revealed. */
export function setLoaderReady() {
  ready = true;
  subs.forEach((f) => f());
}

/** True once the loading screen has finished; lets the hero start its entrance on cue. */
export function useLoaderReady() {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      return () => subs.delete(cb);
    },
    () => ready,
    () => false,
  );
}
