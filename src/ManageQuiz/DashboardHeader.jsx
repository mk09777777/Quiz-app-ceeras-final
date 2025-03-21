"use client";
import React from "react";
import styles from "./Dashboard.module.css";

const DashboardHeader = ({ activeNav, onNavClick, userName }) => {
  const navItems = [
    { name: "Dashboard", isActive: activeNav === "Dashboard" },
    { name: "Progress", isActive: activeNav === "Progress" },
    { name: "Settings", isActive: activeNav === "Settings" },
    { name: "New Quiz", isActive: activeNav === "New Quiz", isSpecial: true },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.navButtons} aria-label="Dashboard Navigation">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={
              item.isActive
                ? styles.navButtonactive
                : item.isSpecial
                ? styles.navButtonnewQuiz
                : styles.navButton
            }
            onClick={() => onNavClick(item.name)}
            aria-current={item.isActive ? "page" : undefined}
          >
            {item.name}
          </button>
        ))}
      </nav>
      <h1 className={styles.welcome}>Welcome, {userName}</h1>
    </header>
  );
};

export default DashboardHeader;
