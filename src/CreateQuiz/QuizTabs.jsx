import React from "react";
import styles from "./InputDesign.module.css";

const QuizTabs = ({ currentStep }) => {
  return (
    <nav className={styles.tabs} aria-label="Quiz creation steps">
      <div
        className={currentStep === 1 ? styles.tabactive : styles.tab}
        aria-current={currentStep === 1 ? "step" : "false"}
      >
        1 Quiz Info
      </div>
      <div className={styles.line} aria-hidden="true" />
      <div
        className={currentStep === 2 ? styles.tabactive : styles.tab}
        aria-current={currentStep === 2 ? "step" : "false"}
      >
        2 Questions
      </div>
      <div className={styles.line} aria-hidden="true" />
      <div
        className={currentStep === 3 ? styles.tabactive : styles.tab}
        aria-current={currentStep === 3 ? "step" : "false"}
      >
        3 Preview
      </div>
    </nav>
  );
};

export default QuizTabs;
