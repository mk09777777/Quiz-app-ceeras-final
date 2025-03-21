import React, { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";
import { doc, getDocs,collection } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";

const QuizItem = ({ participants, timeLeft, status ,name}) => {
  const[quizzdata,setquizzdata]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      const quizzdata = collection(db, "quizzes");
      const usersnapshot = await getDocs(quizzdata);
      const datalist = usersnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setquizzdata(datalist);

     
    };
    fetchData();
  }, []);

  
  return (
    <article className={styles.quizItem}>
      <h3 className={styles.quizName}>{name}</h3>
      <div className={styles.quizDetails}>
        <span className={styles.participantCount}>
          <i className={styles.tiTiUsers} aria-hidden="true" />
          <span>{participants} participants</span>
        </span>
        <span className={styles.timeLeft}>
          <i className={styles.tiTiClock} aria-hidden="true" />
          <span>{timeLeft} left</span>
        </span>
      </div>
      <div>{status}</div>
    </article>
  );
};

export default QuizItem;
