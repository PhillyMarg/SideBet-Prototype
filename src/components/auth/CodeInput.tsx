"use client";

import React, { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from "react";

interface CodeInputProps {
  length?: number;
  onComplete: (code: string) => void;
  disabled?: boolean;
}

export default function CodeInput({
  length = 6,
  onComplete,
  disabled = false,
}: CodeInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (disabled) return;

    // Only allow single digit
    const digit = value.replace(/\D/g, "").slice(-1);

    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    // Move to next input if digit entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    const fullCode = newCode.join("");
    if (fullCode.length === length && !fullCode.includes("")) {
      onComplete(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
      } else {
        // Clear current input
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);

    if (pastedData) {
      const newCode = [...code];
      pastedData.split("").forEach((digit, i) => {
        if (i < length) {
          newCode[i] = digit;
        }
      });
      setCode(newCode);

      // Focus last filled input or next empty
      const lastIndex = Math.min(pastedData.length, length) - 1;
      inputRefs.current[lastIndex]?.focus();

      // Check if complete
      const fullCode = newCode.join("");
      if (fullCode.length === length) {
        onComplete(fullCode);
      }
    }
  };

  return (
    <div className="flex justify-center gap-[20px]">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={code[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`w-[40px] h-[54px] bg-input-bg rounded-[6px] text-center text-[20px] text-placeholder font-normal input-glow ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}
