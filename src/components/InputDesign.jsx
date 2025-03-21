import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseconfig';
import styles from './InputDesign.module.css';
import AddQuestions from './AddQuestions';

const InputDesign = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    rounds: '2',
    timeLimit: { hours: '0', minutes: '15' },
    questionInterval: '5'
  });

  const [quizCreated, setQuizCreated] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the quiz document
      const quizData = {
        ...formData,
        createdAt: new Date().toISOString(),
        createdBy: {
          id: auth.currentUser?.uid,
          name: auth.currentUser?.displayName
        },
        status: 'draft', // Set as draft until questions are added
        roundQuestions: {}, // Initialize empty questions object
        timePerQuestion: 30,
        roundResults: {}
      };

      const docRef = await addDoc(collection(db, 'quizzes'), quizData);
      console.log('Quiz created with ID:', docRef.id);
      setQuizId(docRef.id);
      setQuizCreated(true);

    } catch (error) {
      console.error('Error creating quiz:', error);
      setError('Failed to create quiz: ' + error.message);
    }
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (quizCreated && quizId) {
    return (
      <div className={styles.container}>
        <h2>Add Questions to Your Quiz</h2>
        <p className={styles.info}>
          Please add questions for each round. You need to add at least one question per round.
        </p>
        <AddQuestions 
          quizId={quizId} 
          totalRounds={parseInt(formData.rounds)} 
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          required
        >
          <option value="">Select Category</option>
          <option value="Science">Science</option>
          <option value="Math">Math</option>
          <option value="History">History</option>
          <option value="General Knowledge">General Knowledge</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <select
          value={formData.rounds}
          onChange={(e) => setFormData({...formData, rounds: e.target.value})}
          required
        >
          <option value="1">1 Round</option>
          <option value="2">2 Rounds</option>
          <option value="3">3 Rounds</option>
        </select>
      </div>

      <div className={styles.timeLimit}>
        <label>Time Limit:</label>
        <input
          type="number"
          min="0"
          max="23"
          placeholder="Hours"
          value={formData.timeLimit.hours}
          onChange={(e) => setFormData({
            ...formData,
            timeLimit: { ...formData.timeLimit, hours: e.target.value }
          })}
        />
        <input
          type="number"
          min="0"
          max="59"
          placeholder="Minutes"
          value={formData.timeLimit.minutes}
          onChange={(e) => setFormData({
            ...formData,
            timeLimit: { ...formData.timeLimit, minutes: e.target.value }
          })}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Create Quiz
      </button>
    </form>
  );
};

export default InputDesign; 