"use client";
import React, { useState, useEffect } from "react";
import styles from "./UserManagementDashboard.module.css";
import UserTableRow from "./UserTableRow";
import Pagination from "./Pagination";
import { SearchIcon } from "./icons";

const UsersSection = ({ users, setUsers, onDeleteUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const usersPerPage = 10;
  const roles = ["All Roles", "Admin", "Student", "Teacher"];
  const statuses = ["All Status", "Active", "Inactive"];

  // Apply filters and search
  useEffect(() => {
    let result = [...users];

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply role filter
    if (roleFilter !== "All Roles") {
      result = result.filter((user) => user.role === roleFilter);
    }

    // Apply status filter
    if (statusFilter !== "All Status") {
      result = result.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle select all checkbox
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    setUsers(
      users.map((user) => ({
        ...user,
        selected: newSelectAll,
      }))
    );
  };

  // Handle individual user selection
  const handleSelectUser = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, selected: !user.selected } : user
    );

    setUsers(updatedUsers);

    // Check if all visible users are selected
    const allSelected = currentUsers.every(
      (user) => updatedUsers.find((u) => u.id === user.id)?.selected
    );
    setSelectAll(allSelected);
  };

  return (
    <section className={styles.allUsers} aria-labelledby="all-users-heading">
      <h2 id="all-users-heading" className={styles.sectionTitle}>
        All Users
      </h2>

      <div className={styles.usersFilters}>
        <div className={styles.searchBox}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search users ..."
            className={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search users"
          />
        </div>

        <button
          className={styles.filterBtn}
          onClick={() => {
            const nextIndex = roles.indexOf(roleFilter) + 1;
            setRoleFilter(roles[nextIndex % roles.length]);
          }}
          aria-label="Filter by role"
        >
          {roleFilter}
        </button>

        <button
          className={styles.filterBtn}
          onClick={() => {
            const nextIndex = statuses.indexOf(statusFilter) + 1;
            setStatusFilter(statuses[nextIndex % statuses.length]);
          }}
          aria-label="Filter by status"
        >
          {statusFilter}
        </button>
      </div>

      <div role="region" aria-label="Users table" tabIndex="0">
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th scope="col" className={styles.th}>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    aria-label="Select all users"
                  />
                </div>
              </th>
              <th scope="col" className={styles.th}>
                User
              </th>
              <th scope="col" className={styles.th}>
                Role
              </th>
              <th scope="col" className={styles.th}>
                Status
              </th>
              <th scope="col" className={styles.th}>
                Last Login
              </th>
              <th scope="col" className={styles.th}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  onSelect={() => handleSelectUser(user.id)}
                  onDelete={() => onDeleteUser(user.id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles.noResults}>
                  No users found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredUsers.length}
        itemsPerPage={usersPerPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default UsersSection;
