"use client";
import React from "react";
import styles from "./LoadingPage.module.css";

const FAQ = () => {
  return (
    <section>
      <h2 className={styles.howtoUse2}>Frequently Asked Questions</h2>
      <article
        className={
          styles.ourquizsystemprovidesastreamlinedwayforstudentstoparticipateinassessmentsStudentscanloginusingtheircredentialsenteradminGeneratedquizIDsandcompletequizzeswithinspecifiedtimelimitsTheplatformensuresfairtestingwhileprovidingimmediatefeedbackandcomprehensiveresults2
        }
      >
        <h3 style={{ fontWeight: 700 }}>How do I access my quiz results?</h3>
        <p>
          Your quiz results are available immediately after completion. Visit
          your dashboard and click on the "Results" tab to view detailed
          feedback and analytics.
        </p>
      </article>
      <article
        className={
          styles.ourquizsystemprovidesastreamlinedwayforstudentstoparticipateinassessmentsStudentscanloginusingtheircredentialsenteradminGeneratedquizIDsandcompletequizzeswithinspecifiedtimelimitsTheplatformensuresfairtestingwhileprovidingimmediatefeedbackandcomprehensiveresults3
        }
      >
        <h3 style={{ fontWeight: 700 }}>
          What happens if I lose internet connection during a quiz?
        </h3>
        <p>
          Our system automatically saves your progress. Once your connection is
          restored, you can continue from where you left off within the
          remaining time limit.
        </p>
      </article>
      <article
        className={
          styles.ourquizsystemprovidesastreamlinedwayforstudentstoparticipateinassessmentsStudentscanloginusingtheircredentialsenteradminGeneratedquizIDsandcompletequizzeswithinspecifiedtimelimitsTheplatformensuresfairtestingwhileprovidingimmediatefeedbackandcomprehensiveresults4
        }
      >
        <h3 style={{ fontWeight: 700 }}>
          Can I review my answers after submitting?
        </h3>
        <p>
          Yes, you can review your submitted answers and see correct solutions
          after the quiz deadline has passed, depending on your instructor's
          settings.
        </p>
      </article>
    </section>
  );
};

export default FAQ;
