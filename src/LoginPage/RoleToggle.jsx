"use client";
import React from "react";
import styles from "./LoginContainer.module.css";
import AdminIcon from "./AdminIcon";
import StudentIcon from "./StudentIcon";

const RoleToggle = ({ selectedRole, onRoleChange }) => {
  return (
    <div className={styles.toggleContainer} role="tablist" aria-label="Select user role">
      <button
        className={`${styles.toggleButtonadmin} ${selectedRole === "admin" ? styles.active : ""}`}
        role="tab"
        aria-selected={selectedRole === "admin"}
        onClick={() => onRoleChange("admin")}
        tabIndex={selectedRole === "admin" ? 0 : -1}
      >
        <AdminIcon />
        <span>Admin</span>
      </button>
      <button
        className={`${styles.toggleButtonstudent} ${selectedRole === "student" ? styles.active : ""}`}
        role="tab"
        aria-selected={selectedRole === "student"}
        onClick={() => onRoleChange("student")}
        tabIndex={selectedRole === "student" ? 0 : -1}
      >
        <StudentIcon />
        <span>Student</span>
      </button>
    </div>
  );
};

export default RoleToggle;
