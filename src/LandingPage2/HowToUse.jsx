"use client";
import React from "react";
import styles from "./LoadingPage.module.css";
import Group from "../assets/Group.png"
import Group1 from "../assets/Group1.png"

const HowToUse = () => {
  return (
    <section>
      <h2 className={styles.howtoUse}>How to Use</h2>
      <div className={styles.div10}>
        <div className={styles.div11}>
          <div className={styles.column}>
            <div className={styles.div12}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e30f2d79785865077cff1d261d02c4bb1019a07697acb5d2773255c4a0d81e72?placeholderIfAbsent=true&apiKey=1888b631db9e4d568b5bd7d9a3c74071"
                alt="Login icon"
                className={styles.img4}
              />
              <h3 className={styles.appOverview2}>Login</h3>
              <p className={styles.signinwithyourstudentcredentials}>
                Sign in with your student credentials
              </p>
            </div>
          </div>
          <div className={styles.column2}>
            <div className={styles.div13}>
              <div className={styles.div14}>
                {/* <img src={Group} alt="" className={styles.img6} /> */}
                <div className={styles.div15} aria-hidden="true" />
                <h3 className={styles.appOverview3}>Enter Quiz ID</h3>
              </div>
              <p className={styles.inputthequizcodeprovidedbyyourinstructor}>
                Input the quiz code provided by your instructor
              </p>
            </div>
          </div>
          <div className={styles.column3}>
            <div className={styles.div16}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/986a75b57f2375b3a6c39ab97e0ce62f56def8c5d0ba5508bb82859d303e7b82?placeholderIfAbsent=true&apiKey=1888b631db9e4d568b5bd7d9a3c74071"
                alt="Start quiz icon"
                className={styles.img5}
              />
              <h3 className={styles.appOverview4}>Start Quiz</h3>
              <p className={styles.completethequestionswithinthetimelimit}>
                Complete the questions within the time limit
              </p>
            </div>
          </div>
          <div className={styles.column4}>
            <div className={styles.div17}>
            {/* <img src={Group1} alt="" className={styles.img7} /> */}
              <div className={styles.div18} aria-hidden="true" />
              <h3 className={styles.appOverview5}>View Results</h3>
              <p className={styles.getinstantfeedbackanddetailedanalysis}>
                Get instant feedback and detailed analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
