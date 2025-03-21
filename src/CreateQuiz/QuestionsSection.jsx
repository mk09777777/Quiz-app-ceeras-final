import React from "react";
import styles from "./InputDesign.module.css";
import QuestionCard from "./QuestionCard";

const QuestionsSection = ({
  rounds,
  onQuestionChange,
  onOptionChange,
  onAddQuestion,
  onRemoveQuestion,
  onAddOption,
  onRemoveOption,
  onSetCorrectOption,
  onRoundSettingChange,
  onAddRound,
}) => {
  return (
    <section className={styles.questionsSection} aria-labelledby="questions-heading">
      <div className={styles.sectionHeader}>
        <h2 id="questions-heading" className={styles.title}>
          Rounds & Questions
        </h2>
        <button
          className={styles.addRound}
          onClick={onAddRound}
          aria-label="Add new round"
        >
          Add Round
        </button>
      </div>

      {rounds.map((round, roundIndex) => (
        <div key={roundIndex} className={styles.roundContainer}>
          <div className={styles.roundHeader}>
            <h3 className={styles.roundTitle}>Round {roundIndex + 1}</h3>
            <button
              className={styles.addQuestion}
              onClick={() => onAddQuestion(roundIndex)}
              aria-label={`Add question to round ${roundIndex + 1}`}
            >
              Add Question
            </button>
          </div>

          {round.questions.map((question, questionIndex) => (
            <QuestionCard
              key={question.id}
              question={question}
              questionNumber={questionIndex + 1}
              roundNumber={roundIndex + 1}
              roundSettings={round.settings}
              onQuestionChange={(field, value) =>
                onQuestionChange(roundIndex, question.id, field, value)
              }
              onOptionChange={(optionId, field, value) =>
                onOptionChange(roundIndex, question.id, optionId, field, value)
              }
              onRemoveQuestion={() => onRemoveQuestion(roundIndex, question.id)}
              onAddOption={() => onAddOption(roundIndex, question.id)}
              onRemoveOption={(optionId) => 
                onRemoveOption(roundIndex, question.id, optionId)
              }
              onSetCorrectOption={(optionId) =>
                onSetCorrectOption(roundIndex, question.id, optionId)
              }
              onRoundSettingChange={(field, value) => 
                onRoundSettingChange(roundIndex, field, value)
              }
            />
          ))}

          {round.questions.length === 0 && (
            <p className={styles.noQuestions}>
              No questions added for Round {roundIndex + 1}. Click "Add Question" to get started.
            </p>
          )}
        </div>
      ))}

      {rounds.length === 0 && (
        <p className={styles.noRounds}>
          No rounds added yet. Click "Add Round" to get started.
        </p>
      )}
    </section>
  );
};

export default QuestionsSection;
