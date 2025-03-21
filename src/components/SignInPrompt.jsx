import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseconfig';
import styles from './SignInPrompt.module.css';

const SignInPrompt = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }, { merge: true });

    } catch (error) {
      console.error('Error signing in:', error);
      setError('Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <h2>Sign In Required</h2>
      <p>Please sign in to participate in the quiz</p>
      {error && <div className={styles.error}>{error}</div>}
      <button 
        onClick={handleGoogleSignIn} 
        className={styles.googleButton}
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>
    </div>
  );
};

export default SignInPrompt; 