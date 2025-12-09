"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthInput, AuthButton, BackButton } from "@/components/auth";

export default function CompleteProfilePage() {
  const router = useRouter();
  const { user, userProfile, loading, updateProfile, signOut } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [venmoUsername, setVenmoUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill name from OAuth provider if available
  useEffect(() => {
    if (user?.displayName && !displayName) {
      setDisplayName(user.displayName);
    }
  }, [user, displayName]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  // Redirect if profile is already complete
  useEffect(() => {
    if (!loading && userProfile?.displayName) {
      router.push("/home");
    }
  }, [userProfile, loading, router]);

  const handleVenmoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Ensure @ prefix
    if (value && !value.startsWith("@")) {
      value = "@" + value;
    }
    setVenmoUsername(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!displayName.trim()) {
      setError("Full name is required");
      return;
    }

    setIsLoading(true);

    try {
      await updateProfile({
        displayName: displayName.trim(),
        venmoUsername: venmoUsername.trim() || undefined,
      });
      router.push("/home");
    } catch (err) {
      console.error("Update profile error:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipVenmo = () => {
    setVenmoUsername("");
  };

  const handleBack = async () => {
    // Sign out and go back to sign in
    await signOut();
    router.push("/signin");
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
        {/* Title */}
        <h1 className="mt-[175px] text-white text-[20px] font-light italic text-shadow">
          Complete Your Profile.
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-[345px] mt-[52px] flex flex-col">
          {/* Full Name */}
          <AuthInput
            label="Full Name *"
            type="text"
            placeholder="Phil McCracken"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />

          {/* Venmo Username */}
          <div className="mt-[58px]">
            <div className="flex justify-between items-center mb-3">
              <label className="text-white text-[20px] font-light italic text-shadow pl-1">
                Venmo Username
              </label>
              <button
                type="button"
                onClick={handleSkipVenmo}
                className="text-white text-[14px] font-light italic text-shadow hover:text-accent-orange transition-colors"
              >
                Skip
              </button>
            </div>
            <input
              type="text"
              placeholder="@"
              value={venmoUsername}
              onChange={handleVenmoChange}
              className="w-full h-[36px] bg-input-bg rounded-[6px] px-4 text-white text-[14px] font-normal placeholder-placeholder input-glow"
            />
          </div>

          {/* Helper Text */}
          <p className="mt-[12px] text-white text-[14px] font-light italic text-shadow pl-1">
            Makes Settling Bets Easier.
          </p>

          {/* Error Message */}
          {error && (
            <p className="text-accent-orange text-[12px] text-center mt-4">{error}</p>
          )}

          {/* Get Started Button - Fixed at bottom */}
          <div className="mt-auto pt-[280px]">
            <AuthButton type="submit" variant="primary" loading={isLoading}>
              GET STARTED!
            </AuthButton>
          </div>
        </form>
      </div>
    </div>
  );
}
