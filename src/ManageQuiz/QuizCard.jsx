import React from "react";
import styles from "./Dashboard.module.css";

const QuizCard = ({
  id,
  title,
  description,
  difficultyBadge,
  duration,
  isLocked,
  onStartQuiz,
}) => {
  return (
    <article className={styles.quizCard}>
      <div className={styles.quizHeader}>
        <div
          dangerouslySetInnerHTML={{ __html: difficultyBadge }}
          aria-hidden="true"
        />
        <span className={styles.duration}>{duration}</span>
      </div>
      <h3 className={styles.quizTitle}>{title}</h3>
      <p className={styles.quizDescription}>{description}</p>
      {isLocked ? (
        <div className={styles.startButtonlocked} aria-disabled="true">
          Locked
        </div>
      ) : (
        <button
          className={styles.startButton}
          onClick={() => onStartQuiz(id)}
          aria-label={`Start ${title} quiz`}
        >
          Start Quiz
        </button>
      )}
    </article>
  );
};

export default QuizCard;
