import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, provider, signInWithPopup } from "../firebaseconfig";
import styles from "./LoginContainer.module.css";
import { getDoc, doc } from "firebase/firestore";

const GoogleSignInButton = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const adminDoc = doc(db, "Admin", "CerrasQuizAdmin");
      const adminDetails = await getDoc(adminDoc);
      const adminData = adminDetails.data();

      if (!adminData) {
        alert("Admin data not found!");
        return;
      }

      if (result.user.displayName === adminData?.Name) {
        localStorage.setItem("displayName", result.user.displayName);
        alert(`Welcome ${result.user.displayName}`);
        navigate("/profile");
      } else {
        alert("Invalid Admin");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      alert(`Error: ${error.message}`);
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
