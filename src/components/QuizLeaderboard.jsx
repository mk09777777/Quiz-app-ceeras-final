import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import styles from './QuizLeaderboard.module.css';

const QuizLeaderboard = ({ quizId, roundNumber }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'quizzes', quizId),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const roundResults = data.roundResults[roundNumber] || [];
          
          // Sort by score and time
          const sorted = roundResults.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.completionTime - b.completionTime;
          });
          
          setParticipants(sorted);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [quizId, roundNumber]);

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <div className={styles.leaderboard}>
      <h2>Round {roundNumber + 1} Leaderboard</h2>
      <div className={styles.leaderboardTable}>
        <div className={styles.header}>
          <span>Rank</span>
          <span>Name</span>
          <span>Score</span>
          <span>Time</span>
          <span>Status</span>
        </div>
        {participants.map((participant, index) => (
          <div 
            key={participant.userId} 
            className={`${styles.row} ${
              index < participant.qualifyingCount ? styles.qualified : ''
            }`}
          >
            <span>{index + 1}</span>
            <span>{participant.userName}</span>
            <span>{participant.score}%</span>
            <span>{Math.round(participant.completionTime)}s</span>
            <span>
              {index < participant.qualifyingCount ? 'Qualified' : 'Eliminated'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizLeaderboard;