import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWZcYrpF0OdDbAZr0WoObAKnce3igyIqI",
  authDomain: "sidebet-prototype.firebaseapp.com",
  projectId: "sidebet-prototype",
  storageBucket: "sidebet-prototype.firebasestorage.app",
  messagingSenderId: "167114408906",
  appId: "1:167114408906:web:1c8d9a95bf18ee362b0533",
  measurementId: "G-7QWC1VH5W2"
};

// Initialize Firebase
let app: FirebaseApp;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
