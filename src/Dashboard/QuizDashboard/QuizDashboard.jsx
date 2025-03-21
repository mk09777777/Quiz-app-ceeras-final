import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseconfig';
import styles from './QuizDashboard.module.css';

const QuizDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!location.state?.quizId) return;

    const quizRef = doc(db, 'quizzes', location.state.quizId);
    
    const unsubscribe = onSnapshot(quizRef, (doc) => {
      if (doc.exists()) {
        const quiz = doc.data();
        const roundResults = quiz.roundResults || {};
        
        // Process round results and qualification
        const processedRounds = quiz.rounds.map((round, index) => {
          const results = roundResults[index] || [];
          const userResult = results.find(r => r.userId === userId);
          
          // Sort results by score and time
          const sortedResults = [...results].sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.completionTime - b.completionTime;
          });

          const userRank = sortedResults.findIndex(r => r.userId === userId) + 1;
          const isQualified = userRank > 0 && userRank <= round.settings.qualifyingCount;

          return {
            ...round,
            userScore: userResult?.score || 0,
            userRank,
            totalParticipants: results.length,
            isCompleted: !!userResult,
            isQualified,
            canAttempt: index === 0 || 
              (quiz.rounds[index - 1]?.isCompleted && quiz.rounds[index - 1]?.isQualified)
          };
        });

        setQuizData({
          ...quiz,
          rounds: processedRounds
        });
      }
    });

    return () => unsubscribe();
  }, [location.state?.quizId, userId]);

  const handleStartRound = (roundIndex) => {
    if (!quizData.rounds[roundIndex].canAttempt) {
      alert('Please complete and qualify in the previous round first.');
      return;
    }

    navigate(`/quiz/${location.state.quizId}`, {
      state: { roundIndex }
    });
  };

  if (!quizData) {
    return <div className={styles.loading}>Loading quiz status...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.quizTitle}>{quizData.title}</h1>
      <div className={styles.roundsContainer}>
        {quizData.rounds.map((round, index) => (
          <div 
            key={index} 
            className={`${styles.roundCard} ${round.isCompleted ? styles.completed : ''}`}
          >
            <div className={styles.roundHeader}>
              <h2>Round {index + 1}</h2>
              {round.isCompleted && (
                <span className={`${styles.badge} ${round.isQualified ? styles.qualified : styles.notQualified}`}>
                  {round.isQualified ? 'Qualified' : 'Not Qualified'}
                </span>
              )}
            </div>

            <div className={styles.roundDetails}>
              {round.isCompleted ? (
                <>
                  <p className={styles.score}>Your Score: {round.userScore}%</p>
                  <p className={styles.rank}>
                    Rank: {round.userRank} of {round.totalParticipants}
                  </p>
                  <p className={styles.qualifyingInfo}>
                    Top {round.settings.qualifyingCount} qualify for next round
                  </p>
                </>
              ) : (
                <>
                  <p>Time per question: {round.settings.timePerQuestion} seconds</p>
                  <p>Minimum score to qualify: {round.settings.minScore}%</p>
                  {round.canAttempt ? (
                    <button 
                      className={styles.startButton}
                      onClick={() => handleStartRound(index)}
                    >
                      Start Round {index + 1}
                    </button>
                  ) : (
                    <p className={styles.warning}>
                      Complete previous round to unlock
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDashboard; 