"use client";
import React from "react";
import styles from "./LoadingPage.module.css";

const AppOverview = () => {
  return (
    <section>
      <h1 className={styles.aboutQuizApp}>About Quiz App</h1>
      <p className={styles.p}>
        Learn everything you need to know about our innovative quiz platform
        designed for seamless learning and assessment.
      </p>
      <div className={styles.div6}>
        <h2 className={styles.appOverview}>App Overview</h2>
        <p
          className={
            styles.ourquizsystemprovidesastreamlinedwayforstudentstoparticipateinassessmentsStudentscanloginusingtheircredentialsenteradminGeneratedquizIDsandcompletequizzeswithinspecifiedtimelimitsTheplatformensuresfairtestingwhileprovidingimmediatefeedbackandcomprehensiveresults
          }
        >
          Our quiz system provides a streamlined way for students to participate
          in assessments. Students can log in using their credentials, enter
          admin-generated quiz IDs, and complete quizzes within specified time
          limits. The platform ensures fair testing while providing immediate
          feedback and comprehensive results.
        </p>
        <div className={styles.div7}>
          <div className={styles.div8}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/77996370dd025f522eca0510f09f6a68473959cc3f03e9b8070daf14d6804b56?placeholderIfAbsent=true&apiKey=1888b631db9e4d568b5bd7d9a3c74071"
              alt="Feature icon"
              className={styles.img}
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/77996370dd025f522eca0510f09f6a68473959cc3f03e9b8070daf14d6804b56?placeholderIfAbsent=true&apiKey=1888b631db9e4d568b5bd7d9a3c74071"
              alt="Feature icon"
              className={styles.img2}
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/77996370dd025f522eca0510f09f6a68473959cc3f03e9b8070daf14d6804b56?placeholderIfAbsent=true&apiKey=1888b631db9e4d568b5bd7d9a3c74071"
              alt="Feature icon"
              className={styles.img3}
            />
          </div>
          <div className={styles.div9}>
            <ul
              className={
                styles.securestudentauthenticationsystemRealTimequizparticipationtrackingInstantresultsanddetailedanalytics
              }
            >
              <li>Secure student authentication system</li>
              <li>Real-time quiz participation tracking</li>
              <li>Instant results and detailed analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppOverview;
