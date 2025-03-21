"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginContainer.module.css";
import { auth, provider, signInWithPopup } from "../firebaseconfig";
import RoleToggle from "./RoleToggle";
import GoogleSignInButton from "./GoogleSignInButton";
import LoginDisclaimer from "./LoginDisclaimer";

function LoginContainer() {
  const [selectedRole, setSelectedRole] = React.useState("admin");
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



  return (
    <main className={styles.loginContainer}>
      <section className={styles.loginCard}>
        <h1 className={styles.welcomeText}>Welcome Back Admin</h1>

        <RoleToggle selectedRole={selectedRole} onRoleChange={handleRoleChange} />

        <GoogleSignInButton />


        <LoginDisclaimer />
      </section>
    </main>
  );
}

export default LoginContainer;
