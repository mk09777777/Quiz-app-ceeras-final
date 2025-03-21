import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import SignInPrompt from './SignInPrompt';
import styles from './AuthWrapper.module.css';

const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Store user info in localStorage
        localStorage.setItem('userId', currentUser.uid);
        localStorage.setItem('displayName', currentUser.displayName || 'Anonymous');
        localStorage.setItem('email', currentUser.email);
        setUser(currentUser);
      } else {
        localStorage.removeItem('userId');
        localStorage.removeItem('displayName');
        localStorage.removeItem('email');
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!user) {
    return <SignInPrompt />;
  }

  return children;
};

export default AuthWrapper;