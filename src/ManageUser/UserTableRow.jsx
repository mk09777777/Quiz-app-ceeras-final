"use client";
import React from "react";
import styles from "./UserManagementDashboard.module.css";
import { EditIcon, DeleteIcon } from "./icons";

const UserTableRow = ({ user, onSelect, onDelete }) => {
  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "Admin":
        return styles.roleBadgeAdmin;
      case "Student":
        return styles.roleBadgeStudent;
      default:
        return styles.roleBadgeStudent;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return styles.statusBadgeActive;
      case "Inactive":
        return styles.statusBadgeInactive;
      default:
        return styles.statusBadgeInactive;
    }
  };

  return (
    <tr>
      <td className={styles.td}>
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={user.selected}
            onChange={onSelect}
            aria-label={`Select ${user.name}`}
          />
        </div>
      </td>
      <td className={styles.userInfo}>
        <h3 className={styles.userName}>{user.name}</h3>
        <p className={styles.userEmail}>{user.email}</p>
      </td>
      <td className={styles.badgeCell}>
        <span className={getRoleBadgeClass(user.role)}>{user.role}</span>
      </td>
      <td className={styles.badgeCell}>
        <span className={getStatusBadgeClass(user.status)}>{user.status}</span>
      </td>
      <td className={styles.td}>{user.lastLogin}</td>
      <td className={styles.actionButtons}>
        <button className={styles.iconButton} aria-label={`Edit ${user.name}`}>
          <EditIcon className={styles.editIcon} />
        </button>
        <button
          className={styles.iconButton}
          onClick={onDelete}
          aria-label={`Delete ${user.name}`}
        >
          <DeleteIcon className={styles.deleteIcon} />
        </button>
      </td>
    </tr>
  );
};

export default UserTableRow;
