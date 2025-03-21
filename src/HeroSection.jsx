import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InputDesign.module.css";
import HeroImage from "./HeroImage";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h2 className={styles.title}>Test Your Knowledge</h2>
        <h2 className={styles.subtitle}>Effortlessly!</h2>
        <p className={styles.description}>
          Create, share and take quizzes with ease. Perfect for students,
          teachers, and professionals looking to assess knowledge in a fun and
          engaging way.
        </p>
        <div className={styles.ctaButtons}>
          <button
            className={styles.loginStudent}
            onClick={() => navigate("/studentlogin")}
          >
            Login as Student
          </button>
          <button
            className={styles.loginAdmin}
            onClick={() => navigate("/adminlogin")}
          >
            Admin Login
          </button>
        </div>
      </div>
      <div className={styles.heroImage}>
        <HeroImage />
      </div>
    </section>
  );
}

export default HeroSection;
