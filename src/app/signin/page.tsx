"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { AuthInput, AuthButton, SocialButton } from "@/components/auth";
import { getAuthErrorMessage } from "@/types";

export default function SignInPage() {
  const router = useRouter();
  const { user, userProfile, loading, signInWithEmail, signInWithGoogle, signInWithApple } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user && userProfile) {
      router.push("/home");
    }
  }, [user, userProfile, loading, router]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmail(email, password);
      router.push("/home");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      console.error("Sign in error:", err);
      setError(getAuthErrorMessage(firebaseError.code || ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      await signInWithGoogle();
      router.push("/home");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      console.error("Google sign in error:", err);
      setError(getAuthErrorMessage(firebaseError.code || ""));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setError("");
    setAppleLoading(true);

    try {
      await signInWithApple();
      router.push("/home");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      console.error("Apple sign in error:", err);
      setError(getAuthErrorMessage(firebaseError.code || ""));
    } finally {
      setAppleLoading(false);
    }
  };

  const handlePhoneSignIn = () => {
    router.push("/phone-auth");
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
      <div className="w-full max-w-[393px] px-6 flex flex-col items-center">
        {/* Logo */}
        <h1 className="mt-[131px] text-white text-[32px] font-bold text-shadow">
          SIDEBET
        </h1>

        {/* Tagline */}
        <p className="mt-[12px] text-white text-[20px] font-light italic text-shadow text-center">
          Every Party Needs Stakes.
        </p>

        {/* Social Buttons */}
        <div className="w-[345px] mt-[52px] space-y-[13px]">
          <SocialButton
            provider="google"
            onClick={handleGoogleSignIn}
            loading={googleLoading}
            disabled={isLoading || appleLoading}
          />
          <SocialButton
            provider="apple"
            onClick={handleAppleSignIn}
            loading={appleLoading}
            disabled={isLoading || googleLoading}
          />
          <SocialButton
            provider="phone"
            onClick={handlePhoneSignIn}
            disabled={isLoading || googleLoading || appleLoading}
          />
        </div>

        {/* OR Divider */}
        <p className="mt-[57px] text-white text-[14px] font-light italic text-shadow">
          OR
        </p>

        {/* Email Form */}
        <form onSubmit={handleEmailSignIn} className="w-[345px] mt-[30px] space-y-[8px]">
          <AuthInput
            label="Email Address*"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="pt-[8px]">
            <AuthInput
              label="Password*"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-accent-orange text-[12px] text-center mt-2">{error}</p>
          )}

          {/* Forgot Password */}
          <div className="pt-[12px]">
            <Link
              href="/forgot-password"
              className="block text-center text-white text-[14px] font-light italic text-shadow hover:text-accent-orange transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <div className="pt-[50px]">
            <AuthButton
              type="submit"
              variant="secondary"
              loading={isLoading}
              disabled={googleLoading || appleLoading}
            >
              SIGN IN!
            </AuthButton>
          </div>
        </form>

        {/* Sign Up Section */}
        <p className="mt-[22px] text-white text-[14px] font-light italic text-shadow">
          Late to the Party?
        </p>

        <div className="w-[345px] mt-[14px] mb-8">
          <AuthButton
            variant="primary"
            onClick={() => router.push("/signup")}
            disabled={isLoading || googleLoading || appleLoading}
          >
            SIGN UP!
          </AuthButton>
        </div>
      </div>
    </div>
  );
}
