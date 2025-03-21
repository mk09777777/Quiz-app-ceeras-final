import React from "react";
import styles from "./InputDesign.module.css";

const QuizHeader = ({ onSaveDraft, onPublishQuiz }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Create New Quiz</h1>
      <div className={styles.headerButtons}>
        <button
          className={styles.saveDraft}
          onClick={onSaveDraft}
          aria-label="Save quiz as draft"
        >
          Save Draft
        </button>
        <button
          className={styles.publish}
          onClick={onPublishQuiz}
          aria-label="Publish quiz"
        >
          Publish Quiz
        </button>
      </div>
    </header>
  );
};

export default QuizHeader;
