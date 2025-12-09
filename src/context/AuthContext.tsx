"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, ConfirmationResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  signInWithEmail as signInWithEmailFn,
  signUpWithEmail as signUpWithEmailFn,
  signInWithGoogle as signInWithGoogleFn,
  signInWithApple as signInWithAppleFn,
  sendPhoneVerificationCode,
  verifyPhoneCode as verifyPhoneCodeFn,
  resetPassword as resetPasswordFn,
  signOut as signOutFn,
  initRecaptcha,
  getUserProfile,
  updateUserProfile,
  createUserProfile,
  checkUserExists,
} from "@/lib/auth";
import { UserProfile, AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string): Promise<void> => {
    await signInWithEmailFn(email, password);
  };

  const signUpWithEmail = async (email: string, password: string): Promise<void> => {
    const firebaseUser = await signUpWithEmailFn(email, password);
    setIsNewUser(true);
    // Create a basic profile entry - full profile completed later
    await createUserProfile(firebaseUser, "email");
  };

  const signInWithGoogle = async (): Promise<void> => {
    const firebaseUser = await signInWithGoogleFn();
    const exists = await checkUserExists(firebaseUser.uid);

    if (!exists) {
      setIsNewUser(true);
      await createUserProfile(firebaseUser, "google", {
        displayName: firebaseUser.displayName || "",
      });
    } else {
      setIsNewUser(false);
      const profile = await getUserProfile(firebaseUser.uid);
      // Check if profile is incomplete (no display name)
      if (profile && !profile.displayName) {
        setIsNewUser(true);
      }
    }
  };

  const signInWithApple = async (): Promise<void> => {
    const firebaseUser = await signInWithAppleFn();
    const exists = await checkUserExists(firebaseUser.uid);

    if (!exists) {
      setIsNewUser(true);
      await createUserProfile(firebaseUser, "apple", {
        displayName: firebaseUser.displayName || "",
      });
    } else {
      setIsNewUser(false);
      const profile = await getUserProfile(firebaseUser.uid);
      // Check if profile is incomplete (no display name)
      if (profile && !profile.displayName) {
        setIsNewUser(true);
      }
    }
  };

  const signInWithPhone = async (phoneNumber: string): Promise<ConfirmationResult> => {
    const recaptcha = initRecaptcha("recaptcha-container");
    const confirmationResult = await sendPhoneVerificationCode(phoneNumber, recaptcha);
    return confirmationResult;
  };

  const verifyPhoneCode = async (
    confirmationResult: ConfirmationResult,
    code: string
  ): Promise<boolean> => {
    const firebaseUser = await verifyPhoneCodeFn(confirmationResult, code);
    const exists = await checkUserExists(firebaseUser.uid);

    if (!exists) {
      setIsNewUser(true);
      await createUserProfile(firebaseUser, "phone", {
        phoneNumber: firebaseUser.phoneNumber || "",
      });
      return true; // Is new user
    } else {
      const profile = await getUserProfile(firebaseUser.uid);
      // Check if profile is incomplete (no display name)
      if (profile && !profile.displayName) {
        setIsNewUser(true);
        return true;
      }
      setIsNewUser(false);
      return false; // Existing user
    }
  };

  const signOut = async (): Promise<void> => {
    await signOutFn();
    setUser(null);
    setUserProfile(null);
    setIsNewUser(false);
  };

  const resetPassword = async (email: string): Promise<void> => {
    await resetPasswordFn(email);
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<void> => {
    if (!user) throw new Error("No user logged in");

    await updateUserProfile(user.uid, data);

    // Refresh user profile
    const updatedProfile = await getUserProfile(user.uid);
    setUserProfile(updatedProfile);
    setIsNewUser(false);
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithApple,
    signInWithPhone,
    verifyPhoneCode,
    signOut,
    resetPassword,
    updateProfile,
    isNewUser,
    setIsNewUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
