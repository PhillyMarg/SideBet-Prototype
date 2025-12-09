"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RootPage() {
  const router = useRouter();
  const { user, userProfile, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Check if profile is complete
        if (userProfile?.displayName) {
          router.push("/home");
        } else {
          router.push("/complete-profile");
        }
      } else {
        router.push("/signin");
      }
    }
  }, [user, userProfile, loading, router]);

  // Show loading while determining redirect
  return (
    <div className="auth-gradient min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-[32px] font-bold text-shadow mb-8">
          SIDEBET
        </h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    </div>
  );
}
