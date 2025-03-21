import React from "react";
import styles from "./InputDesign.module.css";

function FeatureCard({ title, description }) {
  return (
    <article className={styles.featureCard}>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </article>
  );
}

export default FeatureCard;
