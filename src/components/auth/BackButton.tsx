"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  onClick?: () => void;
  href?: string;
}

export default function BackButton({ onClick, href }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-[13px] left-[16px] w-[24px] h-[24px] flex items-center justify-center"
      aria-label="Go back"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rotate-180"
      >
        <path
          d="M9 18L15 12L9 6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
