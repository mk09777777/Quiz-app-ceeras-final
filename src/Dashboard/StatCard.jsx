import React from "react";
import styles from "./AdminDashboard.module.css";

const StatCard = ({ label, value, changePercentage, isPositive }) => {
  return (
    <article className={styles.statCard}>
      <div className={styles.statContent}>
        <h3 className={styles.statLabel}>{label}</h3>
        <p className={styles.statValue}>{value}</p>
        <div
          className={
            isPositive ? styles.statChangepositive : styles.statChangenegative
          }
        >
          <i
            className={isPositive ? styles.tiTiArrowUp : styles.tiTiArrowDown}
            aria-hidden="true"
          />
          <span>{changePercentage}% vs last month</span>
        </div>
      </div>
    </article>
  );
};

export default StatCard;
