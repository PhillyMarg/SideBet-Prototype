import { Timestamp } from "firebase/firestore";
import { User, ConfirmationResult } from "firebase/auth";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  venmoUsername?: string;
  phoneNumber?: string;
  authProvider: "email" | "google" | "apple" | "phone";
  createdAt: Timestamp;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
  verifyPhoneCode: (confirmationResult: ConfirmationResult, code: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  isNewUser: boolean;
  setIsNewUser: (value: boolean) => void;
}

export type AuthProvider = "email" | "google" | "apple" | "phone";

export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-email": "Please enter a valid email address",
  "auth/user-not-found": "No account found with this email",
  "auth/wrong-password": "Incorrect password",
  "auth/email-already-in-use": "An account already exists with this email",
  "auth/weak-password": "Password must be at least 6 characters",
  "auth/too-many-requests": "Too many attempts. Please try again later",
  "auth/invalid-credential": "Invalid email or password",
  "auth/invalid-verification-code": "Invalid verification code",
  "auth/code-expired": "Verification code has expired. Please request a new one",
  "passwords-dont-match": "Passwords do not match",
};

export function getAuthErrorMessage(errorCode: string): string {
  return AUTH_ERROR_MESSAGES[errorCode] || "An error occurred. Please try again.";
}
