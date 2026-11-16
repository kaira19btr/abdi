import React from 'react';

interface AbdiLogoProps {
  size?: number;
  className?: string;
}

export function AbdiLogo({ size = 32, className = '' }: AbdiLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <rect width="32" height="32" rx="6" fill="#003049" />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="5.5"
        stroke="rgba(253,240,213,0.28)"
      />
      <path
        d="M8 22.5C11.5 22.5 14 19 16 14C18 19 20.5 22.5 24 22.5"
        stroke="#FDF0D5"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 8.5V23.5"
        stroke="#669BBC"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="9" r="2" fill="#E0A030" />
    </svg>
  );
}
