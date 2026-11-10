type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ChurchIcon({ className }: P) {
  return (
    <svg viewBox="0 0 64 64" {...base} className={className}>
      <path d="M32 3v9M28 7h8" />
      <path d="M32 12 42 26v8H22v-8z" />
      <circle cx="32" cy="26" r="3" />
      <path d="M4 60V44l18-6M60 60V44l-18-6M22 60V34M42 60V34" />
      <path d="M28 60V51a4 4 0 0 1 8 0v9" />
      <path d="M2 60h60" />
    </svg>
  );
}

function Flute({ x, rot }: { x: number; rot: number }) {
  return (
    <g transform={`translate(${x} 30) rotate(${rot})`}>
      <path d="M-5-14h10l-1 20q-4 5-8 0z" />
      <path d="M0 10v16M-6 28h12" />
    </g>
  );
}

export function ChampagneIcon({ className }: P) {
  return (
    <svg viewBox="0 0 64 64" {...base} className={className}>
      <path d="M32 4v6M20 8l3 4M44 8l-3 4" />
      <Flute x={22} rot={-12} />
      <Flute x={42} rot={12} />
    </svg>
  );
}

export function SunIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={1.6} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
    </svg>
  );
}

export function MoonIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={1.6} className={className}>
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2z" />
    </svg>
  );
}
