"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../LoginPage/LoginContainer.module.css";
import { auth, provider, signInWithPopup } from "../firebaseconfig";
import RoleToggle from "../LoginPage/RoleToggle";
import GoogleSignInButton from "../LoginPage/GoogleStudentButton";
import LoginDisclaimer from "../LoginPage/LoginDisclaimer";

function LoginContainer() {
  const [selectedRole, setSelectedRole] = React.useState("student");
  const navigate = useNavigate(); // Hook to navigate

  const handleRoleChange = (role) => {
    console.log("Role changed to:", role);
    setSelectedRole(role);
    if (role === "admin") {
      navigate("/adminlogin");
    } else {
      navigate("/studentlogin");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(`Signed in as ${result.user.displayName} with role${selectedRole}`);
      localStorage.setItem("displayName", result.user.displayName); 
     alert(" Account created successfully you will e notified when quizz are available for you!! ")

    } catch (error) {
      console.error("Google sign-in failed:", error.message);
    }
  };

  return (
    <main className={styles.loginContainer}>
      <section className={styles.loginCard}>
        <h1 className={styles.welcomeText}>Welcome Back User</h1>

        <RoleToggle selectedRole={selectedRole} onRoleChange={handleRoleChange} />

        <GoogleSignInButton onSignIn={handleGoogleSignIn} />


        <LoginDisclaimer />
      </section>
    </main>
  );
}

export default LoginContainer;
