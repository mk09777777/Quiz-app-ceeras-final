"use client";
import React from "react";
import styles from "./UserManagementDashboard.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={styles.tableFooter}>
      <div className={styles.resultsInfo}>
        <span>Showing </span>
        <span className={styles.span}>{totalItems > 0 ? startItem : 0}</span>
        <span> to </span>
        <span className={styles.span}>{endItem}</span>
        <span> of </span>
        <span className={styles.span}>{totalItems}</span>
        <span> results</span>
      </div>

      <div aria-label="Pagination navigation">
        <button
          className={styles.prevBtn}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          Previous
        </button>
        <button
          className={styles.nextBtn}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
