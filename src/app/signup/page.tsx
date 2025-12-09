"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthInput, AuthButton, SocialButton, BackButton } from "@/components/auth";
import { getAuthErrorMessage } from "@/types";

export default function SignUpPage() {
  const router = useRouter();
  const {
    user,
    userProfile,
    loading,
    signUpWithEmail,
    signInWithGoogle,
    signInWithApple,
    isNewUser,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);

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

  const validateForm = (): boolean => {
    if (password !== confirmPassword) {
      setError(getAuthErrorMessage("passwords-dont-match"));
      return false;
    }
    if (password.length < 6) {
      setError(getAuthErrorMessage("auth/weak-password"));
      return false;
    }
    return true;
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await signUpWithEmail(email, password);
      router.push("/complete-profile");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      console.error("Sign up error:", err);
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
      // AuthContext will set isNewUser appropriately
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
      // AuthContext will set isNewUser appropriately
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
      {/* Back Button */}
      <BackButton href="/signin" />

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

        {/* Email Form */}
        <form onSubmit={handleEmailSignUp} className="w-[345px] mt-[73px] space-y-[8px]">
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="pt-[0px]">
            <AuthInput
              label="Confirm Password*"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-accent-orange text-[12px] text-center mt-2">{error}</p>
          )}

          {/* Sign Up Button */}
          <div className="pt-[34px]">
            <AuthButton
              type="submit"
              variant="primary"
              loading={isLoading}
              disabled={googleLoading || appleLoading}
            >
              SIGN UP!
            </AuthButton>
          </div>
        </form>

        {/* Sign In Section */}
        <p className="mt-[22px] text-white text-[14px] font-light italic text-shadow">
          Been Here Before?
        </p>

        <div className="w-[345px] mt-[22px] mb-8">
          <AuthButton
            variant="secondary"
            onClick={() => router.push("/signin")}
            disabled={isLoading || googleLoading || appleLoading}
          >
            SIGN IN!
          </AuthButton>
        </div>
      </div>
    </div>
  );
}
