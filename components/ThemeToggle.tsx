"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "./Icons";

const KEY = "mm-theme";
const EVENT = "mm-theme-change";

/** Applies a saved choice before first paint; with no choice, CSS follows the system setting. */
export const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem("${KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

type Mode = "light" | "dark";

function subscribe(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener(EVENT, cb);
  mq.addEventListener("change", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    mq.removeEventListener("change", cb);
  };
}

function read(): Mode {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Light (Heirloom) / dark (Midnight) switch, last item of the menu. */
export function ThemeToggle({ withLabel = false }: { withLabel?: boolean }) {
  const mode = useSyncExternalStore(subscribe, read, () => "light" as Mode);
  const next: Mode = mode === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage unavailable: the choice still applies for this visit */
    }
    window.dispatchEvent(new Event(EVENT));
  };

  const Icon = mode === "dark" ? SunIcon : MoonIcon;

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      className={`inline-flex cursor-pointer items-center gap-3 text-on-deep opacity-80 transition-[opacity,transform] duration-150 hover:opacity-100 active:scale-95 ${
        withLabel ? "w-full py-3 text-xs uppercase tracking-[0.2em]" : "size-8 justify-center"
      }`}
    >
      <Icon className="size-[18px]" />
      {withLabel && <span>{next === "dark" ? "Dark mode" : "Light mode"}</span>}
    </button>
  );
}
