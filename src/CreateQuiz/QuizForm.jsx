import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import styles from "./InputDesign.module.css";
import TimingSettings from './TimingSettings';

const categories = [
  "General Knowledge",
  "Science",
  "History",
  "Geography",
  "Entertainment",
  "Sports",
  "Technology",
  "Art & Literature",
];

const defaultRoundSettings = {
  qualifyingCount: 10,
  timePerQuestion: 30,
  questions: []
};

const QuizForm = ({ quizData, onInputChange, onTimeChange }) => {
  const [roundSettings, setRoundSettings] = React.useState([defaultRoundSettings]);

  React.useEffect(() => {
    // Verify database connection
    const testConnection = async () => {
      try {
        const testRef = collection(db, "quizzes");
        console.log("Database connection successful");
      } catch (error) {
        console.error("Database connection failed:", error);
      }
    };
    
    testConnection();
  }, []);

  const handleRoundSettingsChange = (roundIndex, field, value) => {
    setRoundSettings(prev => {
      const newSettings = [...prev];
      newSettings[roundIndex] = {
        ...newSettings[roundIndex],
        [field]: value
      };
      return newSettings;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!quizData.title || !quizData.description) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Create a clean data object for submission
      const quizSubmission = {
        ...quizData,
        rounds: roundSettings,
        createdAt: new Date().toISOString(),
        status: "active",
        started: false,
        lastModified: new Date().toISOString(),
        participants: [],
        currentRound: 0,
        roundResults: []
      };

      // Add document to Firestore
      const quizRef = collection(db, "quizzes");
      const docRef = await addDoc(quizRef, quizSubmission);
      
      console.log("Quiz created with ID:", docRef.id);
      alert("Quiz created successfully! Share this link: " + 
        `${window.location.origin}/quiz/${docRef.id}`);
      
      // Clear form or redirect user
      // onInputChange("clear", {}); // Implement this if needed
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz: " + error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.quizForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="quiz-title" className={styles.label}>
            Quiz Title
          </label>
          <input
            id="quiz-title"
            type="text"
            placeholder="Enter an engaging title for your quiz"
            className={styles.input}
            value={quizData.title}
            onChange={(e) => onInputChange("title", e.target.value)}
            aria-required="true"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quiz-description" className={styles.label}>
            Description
          </label>
          <textarea
            id="quiz-description"
            placeholder="Provide a brief description of your quiz..."
            className={styles.textarea}
            value={quizData.description}
            onChange={(e) => onInputChange("description", e.target.value)}
            aria-required="true"
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Time Limit</label>
            <div className={styles.timeInputs}>
              <input
                type="number"
                id="time-hours"
                placeholder="Hours"
                className={styles.input2}
                value={quizData.timeLimit.hours}
                onChange={(e) => onTimeChange("hours", e.target.value)}
                min="0"
                max="24"
                aria-label="Time limit hours"
              />
              <input
                type="number"
                id="time-minutes"
                placeholder="Minutes"
                className={styles.input3}
                value={quizData.timeLimit.minutes}
                onChange={(e) => onTimeChange("minutes", e.target.value)}
                min="0"
                max="59"
                aria-label="Time limit minutes"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="quiz-category" className={styles.label}>
              Category
            </label>
            <select
              id="quiz-category"
              className={styles.select}
              value={quizData.category}
              onChange={(e) => onInputChange("category", e.target.value)}
              aria-required="true"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* <div className={styles.formGroup}>
            <label htmlFor="quiz-rounds" className={styles.label}>
              Number of Rounds
            </label>
            <input
              id="quiz-rounds"
              type="number"
              className={styles.input}
              value={quizData.rounds}
              onChange={(e) => onInputChange("rounds", e.target.value)}
              min="1"
              max="10"
              aria-required="true"
            />
          </div> */}
        </div>
        
        <TimingSettings 
          quizData={quizData}
          onSettingsChange={onInputChange}
        />

        {/* <div className={styles.roundsContainer}>
          <h3>Round Settings</h3>
          {roundSettings.map((round, index) => (
            <div key={index} className={styles.roundSettings}>
              <h4>Round {index + 1}</h4>
              <div className={styles.formGroup}>
                <label htmlFor={`qualifying-count-${index}`}>
                  Number of Qualifiers for Next Round
                </label>
                <input
                  id={`qualifying-count-${index}`}
                  type="number"
                  min="1"
                  value={round.qualifyingCount}
                  onChange={(e) => handleRoundSettingsChange(
                    index, 
                    'qualifyingCount', 
                    parseInt(e.target.value)
                  )}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor={`time-per-question-${index}`}>
                  Time per Question (seconds)
                </label>
                <input
                  id={`time-per-question-${index}`}
                  type="number"
                  min="10"
                  value={round.timePerQuestion}
                  onChange={(e) => handleRoundSettingsChange(
                    index, 
                    'timePerQuestion', 
                    parseInt(e.target.value)
                  )}
                  className={styles.input}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setRoundSettings(prev => [...prev, defaultRoundSettings])}
            className={styles.addRoundButton}
          >
            Add Another Round
          </button>
        </div>

        <button type="submit" className={styles.submitButton}>
          Create Quiz
        </button> */}
      </form>
    </div>
  );
};

export default QuizForm;
