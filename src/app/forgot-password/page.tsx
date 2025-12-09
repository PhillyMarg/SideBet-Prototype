"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthInput, AuthButton, BackButton } from "@/components/auth";
import { getAuthErrorMessage } from "@/types";

type PageState = "form" | "success";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { user, loading, resetPassword } = useAuth();

  const [pageState, setPageState] = useState<PageState>("form");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Redirect if logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/home");
    }
  }, [user, loading, router]);

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await resetPassword(email);
      setPageState("success");
      setResendCooldown(60);
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      console.error("Reset password error:", err);
      setError(getAuthErrorMessage(firebaseError.code || ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setIsLoading(true);
    try {
      await resetPassword(email);
      setResendCooldown(60);
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      console.error("Resend error:", err);
      setError(getAuthErrorMessage(firebaseError.code || ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (pageState === "success") {
      setPageState("form");
      setError("");
    } else {
      router.push("/signin");
    }
  };

  if (loading) {
    return (
      <div className="auth-gradient min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="auth-gradient min-h-screen w-full flex flex-col items-center relative">
      {/* Back Button */}
      <BackButton onClick={handleBack} />

      <div className="w-full max-w-[393px] px-6 flex flex-col items-center">
        {pageState === "form" ? (
          /* Form State */
          <>
            {/* Title */}
            <h1 className="mt-[175px] text-white text-[20px] font-light italic text-shadow">
              Reset Password
            </h1>

            {/* Helper Text */}
            <p className="mt-[24px] text-white text-[14px] font-light italic text-shadow text-center px-4">
              Enter Your Email and We&apos;ll Send You A Reset Link.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-[345px] mt-[39px]">
              <AuthInput
                label="Email Address"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Error Message */}
              {error && (
                <p className="text-accent-orange text-[12px] text-center mt-4">{error}</p>
              )}

              {/* Submit Button */}
              <div className="mt-[50px]">
                <AuthButton type="submit" variant="primary" loading={isLoading}>
                  SEND RESET LINK
                </AuthButton>
              </div>
            </form>
          </>
        ) : (
          /* Success State */
          <>
            {/* Checkmark Icon */}
            <div className="mt-[261px] mb-[18px]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" r="22" stroke="#ff6b35" strokeWidth="4" />
                <path
                  d="M14 24L21 31L34 18"
                  stroke="#ff6b35"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-white text-[20px] font-light italic text-shadow">
              Check Your Email.
            </h1>

            {/* Subtitle */}
            <div className="mt-[42px] text-center">
              <p className="text-white text-[14px] font-light italic text-shadow">
                We Sent A Reset Link to
              </p>
              <p className="text-white text-[14px] font-light italic text-shadow mt-1">
                {email}
              </p>
            </div>

            {/* Resend Text */}
            <p className="mt-[42px] text-white text-[14px] font-light italic text-shadow">
              Didn&apos;t Hit Your Line?{" "}
              {resendCooldown > 0 ? (
                <span className="text-placeholder">RESEND ({resendCooldown}s)</span>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-accent-orange font-semibold italic hover:opacity-80 transition-opacity"
                  disabled={isLoading}
                >
                  RESEND
                </button>
              )}
            </p>

            {/* Back to Sign In Link */}
            <button
              onClick={() => router.push("/signin")}
              className="mt-[42px] text-accent-orange text-[14px] font-semibold italic text-shadow hover:opacity-80 transition-opacity"
            >
              BACK TO SIGN IN.
            </button>
          </>
        )}
      </div>
    </div>
  );
}
