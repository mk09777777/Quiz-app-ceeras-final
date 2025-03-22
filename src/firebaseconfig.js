import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8orYbwHBh4TsaT9nQWirTBAe1Go-hpQg",
  authDomain: "quiz-application-8f6a3.firebaseapp.com",
  projectId: "quiz-application-8f6a3",
  storageBucket: "quiz-application-8f6a3.firebasestorage.app",
  messagingSenderId: "979211086775",
  appId: "1:979211086775:web:f0dad44a1c7410bb741632",
  measurementId: "G-DKB1E02ZYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Create and configure Google provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, db, provider, signInWithPopup };
