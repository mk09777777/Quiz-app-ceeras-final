"use client";
import React from "react";
import styles from "./UserManagementDashboard.module.css";

const PendingRequestsSection = ({ pendingRequests, onAccept, onReject }) => {
  if (pendingRequests.length === 0) {
    return (
      <section
        className={styles.pendingRequests}
        aria-labelledby="pending-requests-heading"
      >
        <h2 id="pending-requests-heading" className={styles.sectionTitle}>
          Pending Requests
        </h2>
        <p className={styles.noResults}>No pending requests at this time.</p>
      </section>
    );
  }

  return (
    <section
      className={styles.pendingRequests}
      aria-labelledby="pending-requests-heading"
    >
      <h2 id="pending-requests-heading" className={styles.sectionTitle}>
        Pending Requests
      </h2>

      <div role="region" aria-label="Pending requests table" tabIndex="0">
        <table className={styles.requestsTable}>
          <thead>
            <tr>
              <th scope="col" className={styles.th}>
                User
              </th>
              <th scope="col" className={styles.th}>
                Email
              </th>
              <th scope="col" className={styles.th}>
                Requested Role
              </th>
              <th scope="col" className={styles.th}>
                Date
              </th>
              <th scope="col" className={styles.th}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request) => (
              <tr key={request.id}>
                <td className={styles.td}>{request.name}</td>
                <td className={styles.td}>{request.email}</td>
                <td className={styles.td}>{request.requestedRole || ""}</td>
                <td className={styles.td}>{request.date}</td>
                <td className={styles.actionButtons}>
                  <button
                    className={styles.acceptBtn}
                    onClick={() => onAccept(request.id)}
                    aria-label={`Accept request from ${request.name}`}
                  >
                    Accept
                  </button>
                  <button
                    className={styles.rejectBtn}
                    onClick={() => onReject(request.id)}
                    aria-label={`Reject request from ${request.name}`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PendingRequestsSection;
