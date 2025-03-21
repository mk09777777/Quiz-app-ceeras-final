import React from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./InputDesign.module.css";

function Header() {
  const navigate = useNavigate(); 

  function handleStart(){
    try {
      navigate("/register");
    } catch (error) {
      alert(error)
    }
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Quiz Master</h1>
      <nav className={styles.nav}>
        <button className={styles.navItem}>Contact</button>
        <button className={styles.navItem} onClick={() => navigate("/about")}>About</button> {/* Navigate on click */}
        <button className={styles.navItem}>Features</button>
        <button className={styles.navItemgettingStarted} onClick={handleStart}>
          Getting Started
        </button>
      </nav>
    </header>
  );
}

export default Header;
