import React from "react";
import styles from "./Dashboard.module.css";

const StatCard = ({ icon, label, value }) => {
  return (
    <article className={styles.statCard}>
      <div dangerouslySetInnerHTML={{ __html: icon }} aria-hidden="true" />
      <div className={styles.statContent}>
        <h2 className={styles.statLabel}>{label}</h2>
        <p className={styles.statValue}>{value}</p>
      </div>
    </article>
  );
};

export default StatCard;
