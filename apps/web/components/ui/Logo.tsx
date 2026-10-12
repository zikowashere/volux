import { useId } from "react";

type LogoProps = {
  /** "full" = symbole + texte, "mark" = symbole seul */
  variant?: "full" | "mark";
  /** Hauteur du logo en pixels */
  size?: number;
  className?: string;
};

export function LogoMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const id = useId();
  const gradientId = `${id}-volux-gradient`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#22C55E" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
      {/* Branche gauche du V */}
      <path
        d="M8 8.5L14.6 23.5"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Branche droite : éclair */}
      <path
        d="M24.5 7L16.6 16.6H20.6L14.6 25.2L25.6 13.8H21.4L24.5 7Z"
        fill="#FACC15"
        stroke="#FACC15"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({
  variant = "full",
  size = 32,
  className = "",
}: LogoProps) {
  if (variant === "mark") {
    return (
      <span
        role="img"
        aria-label="Volux"
        className={`inline-flex ${className}`}
      >
        <LogoMark size={size} />
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label="Volux"
      className={`inline-flex items-center gap-2 select-none ${className || "text-foreground"}`}
    >
      <LogoMark size={size} />
      <span
        aria-hidden="true"
        className="font-sans font-semibold tracking-tight"
        style={{ fontSize: size * 0.72, lineHeight: 1 }}
      >
        Volux
      </span>
    </span>
  );
}
