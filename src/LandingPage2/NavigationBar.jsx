"use client";
import React from "react";
import styles from "./LoadingPage.module.css";

const NavigationBar = () => {
  return (
    <header className={styles.div}>
      <nav className={styles.div2}>
        <div className={styles.div3}>
          <button className={styles.extendedFab} aria-label="About">
            <span className={styles.stateLayer}>About</span>
          </button>
          <button className={styles.extendedFab} aria-label="Features">
            <span className={styles.stateLayer}>Features</span>
          </button>
          <button className={styles.extendedFab} aria-label="Contact">
            <span className={styles.stateLayer}>Contact</span>
          </button>
        </div>
        <button className={styles.extendedFab2} aria-label="Getting Started">
          <span className={styles.stateLayer2}>Getting Started</span>
        </button>
      </nav>
      <div className={styles.div4} aria-hidden="true" />
    </header>
  );
};

export default NavigationBar;
