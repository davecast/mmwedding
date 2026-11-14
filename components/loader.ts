import { useSyncExternalStore } from "react";

const EVENT = "mm-loader-ready";

/*
 * The "ready" signal lives on the document (an attribute plus a window event) rather than
 * in module state: the loading screen sits in the layout and the hero in the page, and
 * those can end up with separate copies of a module, so a plain variable isn't shared.
 */

/** Called once by the preloader when the page is ready to be revealed. */
export function setLoaderReady() {
  document.documentElement.setAttribute("data-ready", "true");
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

/** True once the loading screen has finished; lets the hero start its entrance on cue. */
export function useLoaderReady() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.getAttribute("data-ready") === "true",
    () => false,
  );
}
