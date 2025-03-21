import React from "react";
import styles from "./TimingSettings.module.css";

const TimingSettings = ({ quizData, onSettingsChange }) => {
  const handleActivationTimeChange = (e) => {
    onSettingsChange("activationTime", e.target.value);
  };

  const handleQuestionIntervalChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      onSettingsChange("questionInterval", value);
    }
  };

  const minDateTime = new Date().toISOString().slice(0, 16);

  return (
    <div className={styles.timingContainer}>
      <div className={styles.settingGroup}>
        <label htmlFor="activationTime">Quiz Activation Time:</label>
        <input
          id="activationTime"
          type="datetime-local"
          value={quizData.activationTime}
          onChange={handleActivationTimeChange}
          min={minDateTime}
          className={styles.timeInput}
          required
        />
        <p className={styles.helpText}>
          Set when the quiz will become available to participants
        </p>
      </div>
      {/* <div className={styles.settingGroup}>
        <label htmlFor="questionInterval">Time Between Questions (seconds):</label>
        <input
          id="questionInterval"
          type="number"
          value={quizData.questionInterval}
          onChange={handleQuestionIntervalChange}
          min="0"
          className={styles.numberInput}
          required
        />
        <p className={styles.helpText}>
          Participants must wait this long before accessing the next question
        </p>
      </div> */}
    </div>
  );
};

export default TimingSettings;