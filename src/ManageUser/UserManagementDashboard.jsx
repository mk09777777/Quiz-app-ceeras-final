"use client";
import React, { useState, useEffect } from "react";
import styles from "./UserManagementDashboard.module.css";
import StatisticsSection from "./StatisticsSection";
import PendingRequestsSection from "./PendingRequestsSection";
import UsersSection from "./UsersSection";
import AddUserModal from "./AddUserModal";

const UserManagementDashboard = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 2543,
    activeUsers: 1938,
    pendingRequests: 23,
    totalAdmins: 12,
  });

  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      requestedRole: "Admin",
      date: "2024-02-20",
    },
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-02-20 10:30 AM",
      selected: false,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@example.com",
      role: "Student",
      status: "Inactive",
      lastLogin: "2024-02-19 15:45 PM",
      selected: false,
    },
  ]);

  const handleExport = () => {
    // Convert users to CSV format
    const headers = ["Name", "Email", "Role", "Status", "Last Login"];
    const csvContent = [
      headers.join(","),
      ...users.map((user) =>
        [user.name, user.email, user.role, user.status, user.lastLogin].join(
          ","
        )
      ),
    ].join("\n");

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "users.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAcceptRequest = (id) => {
    // Update pending requests by removing the accepted one
    setPendingRequests(pendingRequests.filter((request) => request.id !== id));

    // Update stats
    setStats({
      ...stats,
      pendingRequests: stats.pendingRequests - 1,
      totalUsers: stats.totalUsers + 1,
      activeUsers: stats.activeUsers + 1,
    });
  };

  const handleRejectRequest = (id) => {
    // Update pending requests by removing the rejected one
    setPendingRequests(pendingRequests.filter((request) => request.id !== id));

    // Update stats
    setStats({
      ...stats,
      pendingRequests: stats.pendingRequests - 1,
    });
  };

  const handleAddUser = (newUser) => {
    // Add new user to the users array
    setUsers([...users, { ...newUser, id: users.length + 1, selected: false }]);

    // Update stats
    setStats({
      ...stats,
      totalUsers: stats.totalUsers + 1,
      activeUsers:
        newUser.status === "Active" ? stats.activeUsers + 1 : stats.activeUsers,
      totalAdmins:
        newUser.role === "Admin" ? stats.totalAdmins + 1 : stats.totalAdmins,
    });

    // Close modal
    setShowAddUserModal(false);
  };

  const handleDeleteUser = (id) => {
    // Find user to be deleted
    const userToDelete = users.find((user) => user.id === id);

    // Remove user from users array
    setUsers(users.filter((user) => user.id !== id));

    // Update stats
    setStats({
      ...stats,
      totalUsers: stats.totalUsers - 1,
      activeUsers:
        userToDelete.status === "Active"
          ? stats.activeUsers - 1
          : stats.activeUsers,
      totalAdmins:
        userToDelete.role === "Admin"
          ? stats.totalAdmins - 1
          : stats.totalAdmins,
    });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=REM:wght@400;700&family=Roboto:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <main className={styles.container}>
        <header className={styles.headerButtons}>
          <button
            className={styles.addUserBtn}
            onClick={() => setShowAddUserModal(true)}
            aria-label="Add new user"
          >
            + Add New User
          </button>
          <button
            className={styles.exportBtn}
            onClick={handleExport}
            aria-label="Export users data"
          >
            Export
          </button>
        </header>

        <StatisticsSection stats={stats} />

        <PendingRequestsSection
          pendingRequests={pendingRequests}
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />

        <UsersSection
          users={users}
          setUsers={setUsers}
          onDeleteUser={handleDeleteUser}
        />

        {showAddUserModal && (
          <AddUserModal
            onClose={() => setShowAddUserModal(false)}
            onAddUser={handleAddUser}
          />
        )}
      </main>
    </>
  );
};

export default UserManagementDashboard;
