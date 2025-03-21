import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseconfig';
import styles from './RoundCompletionDashboard.module.css';

const RoundCompletionDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [roundData, setRoundData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRoundResults = async () => {
      if (!location.state?.quizId) return;

      try {
        const quizDoc = await getDoc(doc(db, 'quizzes', location.state.quizId));
        if (!quizDoc.exists()) return;

        const quizData = quizDoc.data();
        const currentRound = location.state.roundCompleted;
        const roundResults = quizData.roundResults[currentRound] || [];
        
        // Sort results by score and completion time
        const sortedResults = [...roundResults].sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.completionTime - b.completionTime;
        });

        const userResult = roundResults.find(r => r.userId === userId);
        const userRank = sortedResults.findIndex(r => r.userId === userId) + 1;
        const qualifyingCount = quizData.rounds[currentRound].settings.qualifyingCount;
        const minScore = quizData.rounds[currentRound].settings.minScore;
        
        const isQualified = userRank <= qualifyingCount && userResult.score >= minScore;
        const nextRoundAvailable = currentRound < quizData.rounds.length - 1;

        setRoundData({
          roundNumber: currentRound + 1,
          totalRounds: quizData.rounds.length,
          score: userResult.score,
          rank: userRank,
          totalParticipants: roundResults.length,
          qualifyingCount,
          minScore,
          isQualified,
          nextRoundAvailable,
          quizId: location.state.quizId,
          completionTime: userResult.completionTime
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching results:', error);
        setLoading(false);
      }
    };

    fetchRoundResults();
  }, [location.state, userId]);

  const handleNextRound = () => {
    navigate(`/quiz/${location.state.quizId}`, {
      state: { roundIndex: location.state.roundCompleted + 1 }
    });
  };

  if (loading) {
    return <div className={styles.loading}>Loading results...</div>;
  }

  if (!roundData) {
    return <div className={styles.error}>Failed to load round results</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.resultCard}>
        <h1 className={styles.title}>Round {roundData.roundNumber} Complete!</h1>
        
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.label}>Your Score</span>
            <span className={styles.value}>{roundData.score}%</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.label}>Your Rank</span>
            <span className={styles.value}>{roundData.rank} of {roundData.totalParticipants}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.label}>Completion Time</span>
            <span className={styles.value}>{Math.round(roundData.completionTime)} seconds</span>
          </div>
        </div>

        <div className={styles.qualificationInfo}>
          <h2>Qualification Criteria</h2>
          <p>Top {roundData.qualifyingCount} participants qualify</p>
          <p>Minimum score required: {roundData.minScore}%</p>
        </div>

        <div className={styles.qualificationStatus}>
          {roundData.isQualified ? (
            <div className={styles.qualified}>
              <h2>🎉 Congratulations!</h2>
              <p>You have qualified for the next round!</p>
              {roundData.nextRoundAvailable && (
                <button 
                  className={styles.nextRoundButton}
                  onClick={handleNextRound}
                >
                  Start Round {roundData.roundNumber + 1}
                </button>
              )}
            </div>
          ) : (
            <div className={styles.notQualified}>
              <h2>Round Complete</h2>
              <p>Unfortunately, you did not qualify for the next round.</p>
              <p>Keep practicing and try again next time!</p>
            </div>
          )}
        </div>

        {roundData.roundNumber === roundData.totalRounds && (
          <div className={styles.quizComplete}>
            <h2>Quiz Complete!</h2>
            <p>You have completed all rounds of this quiz.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoundCompletionDashboard; 