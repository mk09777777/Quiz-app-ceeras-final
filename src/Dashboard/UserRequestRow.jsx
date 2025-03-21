import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";

const UserRequestRow = ({ userName, userEmail, requestType, date, id }) => {
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userdata = collection(db, "User");
      const usersnapshot = await getDocs(userdata);
      const datalist = usersnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(datalist);

      const user = datalist.find((user) => user.id === id);
      if (user && (user.verify === true || user.reject === true)) {
        setChecked(true);
      }
    };
    fetchData();
  }, [id]);

  const acceptRequest = async (userId) => {
    const userdata = collection(db, "User");
    const usersnapshot = await getDocs(userdata);
    const datalist = usersnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(datalist);

    const user = datalist.find((user) => user.id === userId);

    if (user) {
      if (user.verify === true || user.reject === true) {
        setChecked(true);
      } else {
        try {
          const detailRef = doc(db, "User", userId);
          await updateDoc(detailRef, { verify: true });
          console.log("updated");
          setChecked(true);
        } catch (error) {
          alert(`Error occurred while updating: ${error}`);
        }
      }
    } else {
      console.error("User not found");
    }
  };

  const rejectRequest = async (userId) => {
    const userdata = collection(db, "User");
    const usersnapshot = await getDocs(userdata);
    const datalist = usersnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(datalist);

    const user = datalist.find((user) => user.id === userId);

    if (user) {
      if (user.verify === true || user.reject === true) {
        setChecked(true);
      } else {
        try {
          const detailRef = doc(db, "User", userId);
          await updateDoc(detailRef, { reject: true });
          console.log("updated");
          setChecked(true);
        } catch (error) {
          alert(`Error occurred while updating: ${error}`);
        }
      }
    } else {
      console.error("User not found");
    }
  };

  return (
    <div className={styles.tableRow}>
      <div className={styles.userCell}>
        <div className={styles.userName}>{checked ? "" : userName}</div>
        <div className={styles.userEmail}>{checked ? "" : userEmail}</div>
      </div>
      <div>{checked ? "" : requestType}</div>
      <div></div>
      <div>{checked ? "" : date}</div>
      <div className={styles.actionsCell}>
        <button
          className={checked ? styles.checkedbuttons : styles.acceptBtn}
          onClick={() => acceptRequest(id)}
        >
          Accept
        </button>
        <button
          className={checked ? styles.checkedbuttons : styles.rejectBtn}
          onClick={() => rejectRequest(id)}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default UserRequestRow;
