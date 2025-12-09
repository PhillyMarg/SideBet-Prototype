"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthButton } from "@/components/auth";

export default function HomePage() {
  const router = useRouter();
  const { user, userProfile, loading, signOut } = useAuth();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  // Redirect if profile not complete
  useEffect(() => {
    if (!loading && user && !userProfile?.displayName) {
      router.push("/complete-profile");
    }
  }, [user, userProfile, loading, router]);

  const handleSignOut = async () => {
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

  if (!user || !userProfile) {
    return null;
  }

  return (
    <div className="auth-gradient min-h-screen w-full flex flex-col items-center relative">
      <div className="w-full max-w-[393px] px-6 flex flex-col items-center">
        {/* Logo */}
        <h1 className="mt-[131px] text-white text-[32px] font-bold text-shadow">
          SIDEBET
        </h1>

        {/* Welcome Message */}
        <p className="mt-[24px] text-white text-[20px] font-light italic text-shadow text-center">
          Welcome, {userProfile.displayName}!
        </p>

        {/* User Info Card */}
        <div className="w-[345px] mt-[48px] bg-input-bg rounded-[6px] p-6 input-glow">
          <h2 className="text-white text-[16px] font-semibold mb-4 text-shadow">
            Your Profile
          </h2>

          <div className="space-y-3">
            <div>
              <p className="text-placeholder text-[12px]">Name</p>
              <p className="text-white text-[14px]">{userProfile.displayName}</p>
            </div>

            {userProfile.email && (
              <div>
                <p className="text-placeholder text-[12px]">Email</p>
                <p className="text-white text-[14px]">{userProfile.email}</p>
              </div>
            )}

            {userProfile.phoneNumber && (
              <div>
                <p className="text-placeholder text-[12px]">Phone</p>
                <p className="text-white text-[14px]">{userProfile.phoneNumber}</p>
              </div>
            )}

            {userProfile.venmoUsername && (
              <div>
                <p className="text-placeholder text-[12px]">Venmo</p>
                <p className="text-white text-[14px]">{userProfile.venmoUsername}</p>
              </div>
            )}

            <div>
              <p className="text-placeholder text-[12px]">Auth Provider</p>
              <p className="text-white text-[14px] capitalize">{userProfile.authProvider}</p>
            </div>
          </div>
        </div>

        {/* Placeholder Message */}
        <p className="mt-[48px] text-white text-[14px] font-light italic text-shadow text-center px-4">
          The rest of the app is coming soon. This is just the auth system demo.
        </p>

        {/* Sign Out Button */}
        <div className="w-[345px] mt-[48px]">
          <AuthButton variant="secondary" onClick={handleSignOut}>
            SIGN OUT
          </AuthButton>
        </div>
      </div>
    </div>
  );
}
