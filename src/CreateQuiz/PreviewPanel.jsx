import React from "react";
import styles from "./InputDesign.module.css";

const PreviewPanel = ({ quizData, rounds }) => {
  return (
    <div className={styles.previewPanel}>
      <h2>Quiz Preview</h2>
      
      <div className={styles.previewSection}>
        <h3>Basic Information</h3>
        <p><strong>Title:</strong> {quizData.title}</p>
        <p><strong>Description:</strong> {quizData.description}</p>
        <p><strong>Category:</strong> {quizData.category}</p>
        <p><strong>Time Limit:</strong> {quizData.timeLimit.hours}h {quizData.timeLimit.minutes}m</p>
        <p><strong>Number of Rounds:</strong> {quizData.rounds}</p>
      </div>

      {rounds.map((round, roundIndex) => (
        <div key={roundIndex} className={styles.previewSection}>
          <h3>Round {roundIndex + 1}</h3>
          <div className={styles.roundSettings}>
            <p><strong>Qualifying Count:</strong> {round.settings.qualifyingCount}</p>
            <p><strong>Time per Question:</strong> {round.settings.timePerQuestion}s</p>
            <p><strong>Minimum Score:</strong> {round.settings.minScore}</p>
          </div>
          
          {round.questions.map((question, qIndex) => (
            <div key={qIndex} className={styles.questionPreview}>
              <p><strong>Question {qIndex + 1}:</strong> {question.text}</p>
              <p><strong>Type:</strong> {question.type}</p>
              <div className={styles.optionsPreview}>
                {question.options.map((option, oIndex) => (
                  <p key={oIndex} className={option.isCorrect ? styles.correctOption : ''}>
                    {String.fromCharCode(65 + oIndex)}. {option.text}
                    {option.isCorrect && ' ✓'}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PreviewPanel;
