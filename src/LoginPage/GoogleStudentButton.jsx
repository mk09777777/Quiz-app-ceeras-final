import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup,db } from "../firebaseconfig"; // Ensure correct import path

import styles from "./LoginContainer.module.css";
import { doc, setDoc,serverTimestamp  } from "firebase/firestore";

const GoogleSignInButton = () => {
  const navigate = useNavigate();


  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const saveToFirestore = async(uid,name,email,verify,requestType,id,reject)=>{
        const userdetails = doc(db,"User",uid);
        await setDoc(userdetails,{name,email,verify,requestType,createdAt: serverTimestamp(),id,reject})
      }
      const user = result.user;
      await saveToFirestore(result.user.uid,result.user.displayName,result.user.email,false,"Access Request",result.user.uid,false)

      console.log("User signed in:", user);
      localStorage.setItem("displayName", result.user.displayName);
        alert(`Welcome ${result.user.displayName}`);
        alert(" Account created successfully you will e notified when quizz are available for you!! ")
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <button
      className={styles.googleButton}
      onClick={handleGoogleSignIn}
      aria-label="Sign in with Google"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
