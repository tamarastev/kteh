type IconProps = { size?: number; className?: string };

const base = {
  fill: "none",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconSearch({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} {...base} stroke="currentColor">
      <circle cx="9.5" cy="9.5" r="6.5" />
      <line x1="18.5" y1="18.5" x2="14.3" y2="14.3" />
    </svg>
  );
}

export function IconHome({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} {...base} stroke="currentColor">
      <path d="M3 10.5 11 3l8 7.5" />
      <path d="M5.5 9v9a1 1 0 0 0 1 1H9v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V19h2.5a1 1 0 0 0 1-1V9" />
    </svg>
  );
}

export function IconPerson({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} {...base} stroke="currentColor">
      <circle cx="11" cy="7" r="3.6" />
      <path d="M3.8 19c1-3.6 4-5.6 7.2-5.6s6.2 2 7.2 5.6" />
    </svg>
  );
}

export function IconMail({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} {...base} stroke="currentColor">
      <rect x="2.5" y="4.5" width="17" height="13" rx="1.8" />
      <path d="M3.2 5.5 11 12l7.8-6.5" />
    </svg>
  );
}

export function IconLock({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} {...base} stroke="currentColor">
      <rect x="4.5" y="10" width="13" height="9" rx="1.6" />
      <path d="M7 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function IconPin({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} {...base} stroke="currentColor">
      <path d="M11 20s6.5-6.1 6.5-11A6.5 6.5 0 0 0 4.5 9c0 4.9 6.5 11 6.5 11Z" />
      <circle cx="11" cy="9" r="2.3" />
    </svg>
  );
}

export function IconVerified({ size = 26, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} {...base} stroke="currentColor">
      <path d="M11 2.8 13.5 4.6l3.1-.2 1 2.9 2.5 1.8-1 2.9 1 2.9-2.5 1.8-1 2.9-3.1-.2L11 21.2l-2.5-1.8-3.1.2-1-2.9-2.5-1.8 1-2.9-1-2.9 2.5-1.8 1-2.9 3.1.2Z" />
      <path d="M7.8 11.2 10 13.4l4.4-4.6" />
    </svg>
  );
}

export function IconHandshake({ size = 26, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} {...base} stroke="currentColor">
      <path d="M2.5 10.5 6 7l3 1.6" />
      <path d="M19.5 10.5 16 7l-3 1.6" />
      <path d="M6 7 9.6 10.4a1.5 1.5 0 0 0 2.1 0l.1-.1a1.5 1.5 0 0 1 2.1 0l2.5 2.4" />
      <path d="M9 10.5 5.6 13.8a1.4 1.4 0 0 0 2 2l.5-.5" />
      <path d="M8.1 15.3a1.4 1.4 0 0 0 2 2l1-1" />
      <path d="M2.5 10.5 5 15l1.6 1.4" />
      <path d="M19.5 10.5 17 15l-3.4 3.4a1.4 1.4 0 0 1-2-2" />
    </svg>
  );
}

export function IconClock({ size = 26, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} {...base} stroke="currentColor">
      <circle cx="11" cy="11" r="8.3" />
      <path d="M11 6.3V11l3.2 2" />
    </svg>
  );
}

export function IconShield({ size = 26, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} {...base} stroke="currentColor">
      <path d="M11 2.5 18.5 5.3V10c0 5-3.2 8.6-7.5 9.5C6.7 18.6 3.5 15 3.5 10V5.3Z" />
      <path d="M7.8 11 10 13.2l4.4-4.6" />
    </svg>
  );
}
