"use client";

import React, { forwardRef } from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-white text-[20px] font-light italic text-shadow mb-3 pl-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full h-[36px] bg-input-bg rounded-[6px] px-4 text-white text-[14px] font-normal placeholder-placeholder input-glow ${className}`}
          {...props}
        />
        {error && (
          <p className="text-accent-orange text-[12px] mt-1 pl-1">{error}</p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
