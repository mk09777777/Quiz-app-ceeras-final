"use client";
import React from "react";
import styles from "./UserManagementDashboard.module.css";

const StatisticsSection = ({ stats }) => {
  const { totalUsers, activeUsers, pendingRequests, totalAdmins } = stats;

  return (
    <section className={styles.statsContainer} aria-labelledby="stats-heading">
      {/* <h2 id="stats-heading" className="sr-only">
        User Statistics
      </h2> */}

      <article className={styles.statCard}>
        <h3 className={styles.statTitle}>Total Users</h3>
        <p className={styles.statValue}>{totalUsers.toLocaleString()}</p>
      </article>

      <article className={styles.statCard}>
        <h3 className={styles.statTitle}>Active Users</h3>
        <p className={styles.statValue}>{activeUsers.toLocaleString()}</p>
      </article>

      <article className={styles.statCard}>
        <h3 className={styles.statTitle}>Pending Requests</h3>
        <p className={styles.statValue}>{pendingRequests.toLocaleString()}</p>
      </article>

      <article className={styles.statCard}>
        <h3 className={styles.statTitle}>Total Admins</h3>
        <p className={styles.statValue}>{totalAdmins.toLocaleString()}</p>
      </article>
    </section>
  );
};

export default StatisticsSection;
