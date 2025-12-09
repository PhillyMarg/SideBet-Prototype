"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ConfirmationResult } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { AuthButton, BackButton, CodeInput } from "@/components/auth";
import { formatPhoneNumber, parsePhoneNumber } from "@/lib/auth";
import { getAuthErrorMessage } from "@/types";

type AuthState = "phone" | "code";

export default function PhoneAuthPage() {
  const router = useRouter();
  const { user, userProfile, loading, signInWithPhone, verifyPhoneCode, isNewUser } = useAuth();

  const [authState, setAuthState] = useState<AuthState>("phone");
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Redirect if already logged in with complete profile
  useEffect(() => {
    if (!loading && user) {
      if (isNewUser || !userProfile?.displayName) {
        router.push("/complete-profile");
      } else if (userProfile) {
        router.push("/home");
      }
    }
  }, [user, userProfile, loading, isNewUser, router]);

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSendCode = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const fullPhoneNumber = parsePhoneNumber(countryCode, phoneNumber);
      const result = await signInWithPhone(fullPhoneNumber);
      setConfirmationResult(result);
      setAuthState("code");
      setResendCooldown(60);
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      console.error("Phone sign in error:", err);
      setError(getAuthErrorMessage(firebaseError.code || ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = useCallback(async (code: string) => {
    if (!confirmationResult) return;

    setError("");
    setIsLoading(true);

    try {
      const newUser = await verifyPhoneCode(confirmationResult, code);
      if (newUser) {
        router.push("/complete-profile");
      } else {
        router.push("/home");
      }
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      console.error("Verify code error:", err);
      setError(getAuthErrorMessage(firebaseError.code || ""));
    } finally {
      setIsLoading(false);
    }
  }, [confirmationResult, verifyPhoneCode, router]);

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    await handleSendCode();
  };

  const handleBack = () => {
    if (authState === "code") {
      setAuthState("phone");
      setError("");
    } else {
      router.push("/signin");
    }
  };

  const formattedDisplayPhone = () => {
    const code = countryCode.startsWith("+") ? countryCode : `+${countryCode}`;
    return `${code} ${phoneNumber}`;
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

      {/* reCAPTCHA Container (invisible) */}
      <div id="recaptcha-container"></div>

      <div className="w-full max-w-[393px] px-6 flex flex-col items-center">
        {/* Logo */}
        <h1 className="mt-[127px] text-white text-[32px] font-bold text-shadow">
          SIDEBET
        </h1>

        {/* Tagline */}
        <p className="mt-[12px] text-white text-[20px] font-light italic text-shadow text-center">
          Every Party Needs Stakes.
        </p>

        {authState === "phone" ? (
          /* Phone Number Entry State */
          <>
            {/* Helper Text */}
            <p className="mt-[32px] text-white text-[14px] font-light italic text-shadow text-center">
              We&apos;ll send you a verification code.
            </p>

            {/* Phone Input */}
            <form onSubmit={handleSendCode} className="w-[345px] mt-[52px]">
              <div className="flex gap-[15px]">
                {/* Country Code */}
                <input
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-[54px] h-[36px] bg-input-bg rounded-[6px] px-2 text-white text-[14px] font-normal placeholder-placeholder input-glow text-center"
                  placeholder="+1"
                />

                {/* Phone Number */}
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="flex-1 h-[36px] bg-input-bg rounded-[6px] px-4 text-white text-[14px] font-normal placeholder-placeholder input-glow"
                  placeholder="(555) 555-0000"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-accent-orange text-[12px] text-center mt-4">{error}</p>
              )}

              {/* Send Code Button */}
              <div className="mt-[52px]">
                <AuthButton type="submit" variant="primary" loading={isLoading}>
                  SEND CODE
                </AuthButton>
              </div>
            </form>
          </>
        ) : (
          /* Code Verification State */
          <>
            {/* Sent To Text */}
            <p className="mt-[32px] text-white text-[14px] font-light italic text-shadow text-center">
              Sent to {formattedDisplayPhone()}
            </p>

            {/* Code Input */}
            <div className="mt-[40px]">
              <CodeInput onComplete={handleVerifyCode} disabled={isLoading} />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-accent-orange text-[12px] text-center mt-4">{error}</p>
            )}

            {/* Resend Text */}
            <p className="mt-[12px] text-white text-[14px] font-light italic text-shadow">
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

            {/* Verify Button */}
            <div className="w-[345px] mt-[36px]">
              <AuthButton
                variant="primary"
                loading={isLoading}
                disabled={true}
              >
                VERIFY
              </AuthButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
