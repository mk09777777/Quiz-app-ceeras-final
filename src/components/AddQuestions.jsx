import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import { useNavigate } from 'react-router-dom';
import styles from './AddQuestions.module.css';

const AddQuestions = ({ quizId }) => {
  const navigate = useNavigate();
  const [round, setRound] = useState(1);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [questionCount, setQuestionCount] = useState(0);

  // Track questions added for each round
  const [roundQuestions, setRoundQuestions] = useState({});

  useEffect(() => {
    // Fetch existing questions count for each round
    const fetchQuestionCounts = async () => {
      try {
        const questionsQuery = query(
          collection(db, 'questions'),
          where('quizId', '==', quizId)
        );
        const snapshot = await getDocs(questionsQuery);
        const questions = snapshot.docs.map(doc => doc.data());
        
        // Count questions per round
        const counts = questions.reduce((acc, q) => {
          acc[q.round] = (acc[q.round] || 0) + 1;
          return acc;
        }, {});
        
        setRoundQuestions(counts);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestionCounts();
  }, [quizId, questionCount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const questionData = {
        quizId,
        round: Number(round), // Ensure round is a number
        questionText,
        options,
        correctAnswer,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'questions'), questionData);
      setQuestionCount(prev => prev + 1);
      
      // Clear form
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswer(0);
      setMessage('Question added successfully!');
    } catch (error) {
      console.error('Error adding question:', error);
      setMessage('Error adding question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePublishQuiz = async () => {
    try {
      setLoading(true);
      
      // Check if there's at least one question per round
      const questionsQuery = query(
        collection(db, 'questions'),
        where('quizId', '==', quizId)
      );
      const snapshot = await getDocs(questionsQuery);
      const questions = snapshot.docs.map(doc => doc.data());
      
      if (questions.length === 0) {
        setMessage('Please add at least one question before publishing');
        return;
      }

      // Update quiz status to active
      const quizRef = doc(db, 'quizzes', quizId);
      await updateDoc(quizRef, {
        status: 'active',
        publishedAt: new Date().toISOString()
      });

      setMessage('Quiz published successfully!');
      // Redirect to home or quiz list after short delay
      setTimeout(() => navigate('/'), 2000);
      
    } catch (error) {
      console.error('Error publishing quiz:', error);
      setMessage('Error publishing quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Add Questions for Quiz</h2>
        <div className={styles.questionCount}>
          {Object.entries(roundQuestions).map(([roundNum, count]) => (
            <div key={roundNum} className={styles.roundCount}>
              Round {roundNum}: {count} questions
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Round:</label>
          <select 
            value={round} 
            onChange={(e) => setRound(Number(e.target.value))}
          >
            <option value={1}>Round 1</option>
            <option value={2}>Round 2</option>
            <option value={3}>Round 3</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Question:</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
            placeholder="Enter your question"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
        </div>

        <div className={styles.formGroup}>
          <label>Correct Answer:</label>
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(Number(e.target.value))}
          >
            {options.map((_, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <button 
            type="submit" 
            disabled={loading}
            className={styles.addButton}
          >
            {loading ? 'Adding...' : 'Add Question'}
          </button>

          <button
            type="button"
            onClick={handlePublishQuiz}
            disabled={loading || questionCount === 0}
            className={styles.publishButton}
          >
            {loading ? 'Publishing...' : 'Publish Quiz'}
          </button>
        </div>

        {message && (
          <div className={`${styles.message} ${message.includes('Error') ? styles.error : styles.success}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddQuestions; 