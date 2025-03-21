import React from 'react';
import { auth, provider, signInWithPopup } from '../firebaseconfig';
import { useNavigate } from 'react-router-dom';
import styles from './GoogleSignInButton.module.css';

const GoogleSignInButton = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Store user data
      localStorage.setItem('userId', result.user.uid);
      localStorage.setItem('displayName', result.user.displayName || 'Anonymous');
      
      // Navigate to profile after successful sign-in
      navigate('/profile');
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <button 
      className={styles.googleButton}
      onClick={handleGoogleSignIn}
      type="button"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;