"use client";

import React from "react";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
  children: React.ReactNode;
}

export default function AuthButton({
  variant = "primary",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: AuthButtonProps) {
  const baseStyles =
    "w-full h-[36px] rounded-[6px] text-white text-[14px] font-normal text-shadow transition-opacity duration-200 flex items-center justify-center";

  const variantStyles = {
    primary: "bg-primary-button hover:opacity-90",
    secondary: "bg-secondary-button hover:opacity-90",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
