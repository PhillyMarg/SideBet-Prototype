import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  ConfirmationResult,
  User,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { UserProfile, AuthProvider } from "@/types";

// Providers
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");
appleProvider.addScope("email");
appleProvider.addScope("name");

// Email/Password Authentication
export async function signInWithEmail(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signUpWithEmail(email: string, password: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}

// OAuth Authentication
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signInWithApple(): Promise<User> {
  const result = await signInWithPopup(auth, appleProvider);
  return result.user;
}

// Phone Authentication
let recaptchaVerifier: RecaptchaVerifier | null = null;

export function initRecaptcha(containerId: string): RecaptchaVerifier {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear();
  }

  recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: () => {
      // reCAPTCHA solved
    },
  });

  return recaptchaVerifier;
}

export async function sendPhoneVerificationCode(
  phoneNumber: string,
  recaptcha: RecaptchaVerifier
): Promise<ConfirmationResult> {
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
  return confirmationResult;
}

export async function verifyPhoneCode(
  confirmationResult: ConfirmationResult,
  code: string
): Promise<User> {
  const result = await confirmationResult.confirm(code);
  return result.user;
}

// Password Reset
export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

// Sign Out
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

// Firestore User Profile Functions
export async function createUserProfile(
  user: User,
  provider: AuthProvider,
  additionalData?: Partial<UserProfile>
): Promise<void> {
  const userRef = doc(db, "users", user.uid);

  const profileData: UserProfile = {
    uid: user.uid,
    email: user.email || "",
    displayName: additionalData?.displayName || user.displayName || "",
    phoneNumber: user.phoneNumber || additionalData?.phoneNumber || undefined,
    venmoUsername: additionalData?.venmoUsername || undefined,
    authProvider: provider,
    createdAt: serverTimestamp() as Timestamp,
  };

  await setDoc(userRef, profileData);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }

  return null;
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, data);
}

export async function checkUserExists(uid: string): Promise<boolean> {
  const profile = await getUserProfile(uid);
  return profile !== null;
}

export async function checkProfileComplete(uid: string): Promise<boolean> {
  const profile = await getUserProfile(uid);
  return profile !== null && !!profile.displayName;
}

// Format phone number for display
export function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
}

// Parse phone number to E.164 format
export function parsePhoneNumber(countryCode: string, phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const code = countryCode.replace(/\D/g, "");
  return `+${code}${cleaned}`;
}
