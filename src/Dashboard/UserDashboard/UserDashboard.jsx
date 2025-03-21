import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseconfig';
import styles from './UserDashboard.module.css';

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!location.state?.quizId) return;

    const quizRef = doc(db, 'quizzes', location.state.quizId);
    
    // Real-time updates for quiz results
    const unsubscribe = onSnapshot(quizRef, (doc) => {
      if (doc.exists()) {
        const quizData = doc.data();
        const roundResults = quizData.roundResults || {};
        
        const processedRounds = quizData.rounds.map((round, index) => {
          const roundResult = roundResults[index] || [];
          const userResult = roundResult.find(r => r.userId === userId);
          const sortedResults = [...roundResult].sort((a, b) => 
            b.score !== a.score ? b.score - a.score : a.completionTime - b.completionTime
          );
          const userRank = sortedResults.findIndex(r => r.userId === userId) + 1;
          const qualified = userRank > 0 && userRank <= round.settings.qualifyingCount;
          const now = new Date();
          const startTime = new Date(round.settings.startTime);
          const endTime = new Date(round.settings.endTime);
          
          return {
            roundNumber: index + 1,
            settings: round.settings,
            completed: !!userResult,
            score: userResult?.score || 0,
            rank: userRank || '-',
            qualified,
            canStart: now >= startTime && now <= endTime && 
                     (index === 0 || (quizData.rounds[index - 1]?.completed && qualified)),
            totalParticipants: roundResult.length,
            startTime,
            endTime,
            isActive: now >= startTime && now <= endTime
          };
        });

        const processedQuiz = {
          id: doc.id,
          ...quizData,
          rounds: processedRounds,
          isComplete: processedRounds.every(round => round.completed)
        };

        setQuizzes([processedQuiz]);
        setActiveQuiz(processedQuiz);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [location.state?.quizId, userId]);

  const handleStartRound = (quizId, roundIndex) => {
    navigate(`/quiz/${quizId}`, { 
      state: { 
        roundIndex,
        returnToDashboard: true 
      }
    });
  };

  if (loading) {
    return <div className={styles.loading}>Loading quiz status...</div>;
  }

  return (
    <div className={styles.dashboard}>
      {activeQuiz && (
        <div className={styles.quizContainer}>
          <div className={styles.quizHeader}>
            <h1 className={styles.quizTitle}>{activeQuiz.title}</h1>
            {activeQuiz.isComplete && (
              <div className={styles.completionBadge}>Quiz Completed</div>
            )}
          </div>

          <div className={styles.roundsGrid}>
            {activeQuiz.rounds.map((round, index) => (
              <div key={index} className={`${styles.roundCard} ${round.isActive ? styles.activeRound : ''}`}>
                <div className={styles.roundHeader}>
                  <h2>Round {round.roundNumber}</h2>
                  {round.isActive && <span className={styles.liveIndicator}>LIVE</span>}
                </div>

                <div className={styles.roundInfo}>
                  <div className={styles.timingInfo}>
                    <p>Starts: {round.startTime.toLocaleString()}</p>
                    <p>Ends: {round.endTime.toLocaleString()}</p>
                  </div>

                  {round.completed ? (
                    <div className={styles.resultInfo}>
                      <p className={styles.score}>Score: {round.score}%</p>
                      <p>Rank: {round.rank} of {round.totalParticipants}</p>
                      <div className={`${styles.qualificationStatus} ${round.qualified ? styles.qualified : styles.notQualified}`}>
                        {round.qualified ? 'Qualified for Next Round!' : 'Did Not Qualify'}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.roundActions}>
                      {round.canStart ? (
                        <button
                          className={styles.startButton}
                          onClick={() => handleStartRound(activeQuiz.id, index)}
                        >
                          Start Round {round.roundNumber}
                        </button>
                      ) : (
                        <div className={styles.roundStatus}>
                          {new Date() < round.startTime ? (
                            <p>Round starts in: {getTimeRemaining(round.startTime)}</p>
                          ) : new Date() > round.endTime ? (
                            <p>Round has ended</p>
                          ) : (
                            <p>Complete previous round first</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to format time remaining
const getTimeRemaining = (startTime) => {
  const now = new Date();
  const diff = startTime - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

export default UserDashboard; 