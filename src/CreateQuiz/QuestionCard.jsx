import React from "react";
import styles from "./InputDesign.module.css";

const QuestionCard = ({
  question,
  questionNumber,
  roundNumber,
  roundSettings,
  onQuestionChange,
  onOptionChange,
  onRemoveQuestion,
  onAddOption,
  onRemoveOption,
  onSetCorrectOption,
  onRoundSettingChange,
}) => {
  return (
    <div className={styles.questionCard}>
      <div className={styles.roundSettings}>
        <h4>Round {roundNumber} Settings</h4>
        <div className={styles.settingGroup}>
          <label>
            Students to Qualify:
            <input
              type="number"
              min="1"
              value={roundSettings.qualifyingCount}
              onChange={(e) => onRoundSettingChange('qualifyingCount', parseInt(e.target.value))}
            />
          </label>
        </div>
        <div className={styles.settingGroup}>
          <label>
            Round Start Time:
            <input
              type="datetime-local"
              value={roundSettings.startTime}
              onChange={(e) => onRoundSettingChange('startTime', e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </label>
        </div>
        <div className={styles.settingGroup}>
          <label>
            Round End Time:
            <input
              type="datetime-local"
              value={roundSettings.endTime}
              onChange={(e) => onRoundSettingChange('endTime', e.target.value)}
              min={roundSettings.startTime}
            />
          </label>
        </div>
        <div className={styles.settingGroup}>
          <label>
            Time per Question (seconds):
            <input
              type="number"
              min="5"
              value={roundSettings.timePerQuestion}
              onChange={(e) => onRoundSettingChange('timePerQuestion', parseInt(e.target.value))}
            />
          </label>
        </div>
        <div className={styles.settingGroup}>
          <label>
            Minimum Score to Pass:
            <input
              type="number"
              min="0"
              value={roundSettings.minScore}
              onChange={(e) => onRoundSettingChange('minScore', parseInt(e.target.value))}
            />
          </label>
        </div>
      </div>

      <div className={styles.questionHeader}>
        <h3>Question {questionNumber}</h3>
        <button
          onClick={onRemoveQuestion}
          className={styles.removeButton}
          aria-label="Remove question"
        >
          Remove
        </button>
      </div>

      <div className={styles.questionContent}>
        <textarea
          value={question.text}
          onChange={(e) => onQuestionChange('text', e.target.value)}
          placeholder="Enter your question"
          className={styles.questionInput}
        />

        <div className={styles.optionsContainer}>
          {question.options.map((option) => (
            <div key={option.id} className={styles.optionGroup}>
              <input
                type="text"
                value={option.text}
                onChange={(e) =>
                  onOptionChange(option.id, 'text', e.target.value)
                }
                placeholder="Enter option"
                className={styles.optionInput}
              />
              <input
                type="radio"
                checked={option.isCorrect}
                onChange={() => onSetCorrectOption(option.id)}
                name={`correct-${question.id}`}
                className={styles.correctOption}
              />
              <button
                onClick={() => onRemoveOption(option.id)}
                className={styles.removeOptionButton}
                aria-label="Remove option"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onAddOption}
          className={styles.addOptionButton}
          aria-label="Add option"
        >
          Add Option
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
