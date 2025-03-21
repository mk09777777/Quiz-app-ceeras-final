"use client";
import React from "react";
import styles from "./LoadingPage.module.css";

const SupportSection = () => {
  return (
    <section>
      <h2 className={styles.howtoUse3}>Need Help?</h2>
      <p
        className={
          styles.ourquizsystemprovidesastreamlinedwayforstudentstoparticipateinassessmentsStudentscanloginusingtheircredentialsenteradminGeneratedquizIDsandcompletequizzeswithinspecifiedtimelimitsTheplatformensuresfairtestingwhileprovidingimmediatefeedbackandcomprehensiveresults5
        }
      >
        Our support team is here to assist you with any questions or technical
        issues.
      </p>
      <div className={styles.div19}>
        <button className={styles.extendedFab3} aria-label="Contact Support">
          <span className={styles.stateLayer3}>Contact Support</span>
        </button>
        <button className={styles.extendedFab4} aria-label="View Documentation">
          <span className={styles.stateLayer4}>View Documentation</span>
        </button>
      </div>
    </section>
  );
};

export default SupportSection;
