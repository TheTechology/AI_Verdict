interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="11" fill="#0e0f0c" />
      <circle cx="24" cy="24" r="14" stroke="#9fe870" strokeOpacity="0.45" strokeWidth="2" />
      <path
        d="M16.5 24.5L21.5 30L32 17.5"
        stroke="#9fe870"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className = "h-8 w-8", showWordmark = true }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className={className} />
      {showWordmark && (
        <span className="font-serif font-bold text-ink-50 tracking-tight text-lg">VERIDIC</span>
      )}
    </span>
  );
}
