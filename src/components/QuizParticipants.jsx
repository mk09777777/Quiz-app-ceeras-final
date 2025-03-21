import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import styles from './QuizParticipants.module.css';

const QuizParticipants = ({ quizId }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRound, setSelectedRound] = useState(0);

  useEffect(() => {
    fetchParticipantsData();
  }, [quizId, selectedRound]);

  const fetchParticipantsData = async () => {
    try {
      setLoading(true);

      // Fetch quiz data to get round information
      const quizDoc = await getDocs(query(
        collection(db, 'quizzes'),
        where('__name__', '==', quizId)
      ));

      if (!quizDoc.empty) {
        const quizData = quizDoc.docs[0].data();
        const roundResults = quizData.roundResults?.[selectedRound] || [];
        console.log(quizData);
        // ...existing code...
        console.log(quizData.roundResults["0"][0].userName);
        // ...existing code...


        // Get user details for each participant
        const participantDetails = await Promise.all(
          roundResults.map(async (result) => {
            const userDoc = await getDocs(query(
              collection(db, 'users'),
              where('uid', '==', result.userId)
            ));

            const userData = userDoc.docs[0]?.data() || {};
            console.log(userData);

            return {
              ...result,
              displayName: quizData.roundResults["0"][0].userName || 'Anonymous',
              email: userData.email || 'N/A',
              qualified: isQualified(result, roundResults, quizData.rounds[selectedRound])
            };
          })
        );

        // Sort by score (highest first)
        const sortedParticipants = participantDetails.sort((a, b) => b.score - a.score);
        setParticipants(sortedParticipants);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching participants:', error);
      setError('Failed to load participants data');
      setLoading(false);
    }
  };

  const isQualified = (result, allResults, roundSettings) => {
    if (!result.score || !roundSettings?.settings?.qualifyingCount) return false;
    const rank = allResults.filter(r => r.score > result.score).length + 1;
    return rank <= roundSettings.settings.qualifyingCount;
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Score', 'Completion Time', 'Qualified'];
    const csvData = participants.map(p => [
      p.displayName,
      p.email,
      p.score,
      p.completionTime,
      p.qualified ? 'Yes' : 'No'
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-${quizId}-round-${selectedRound + 1}-participants.csv`;
    a.click();
  };

  if (loading) {
    return <div className={styles.loading}>Loading participants data...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Quiz Participants</h2>
        <div className={styles.controls}>
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(Number(e.target.value))}
            className={styles.roundSelect}
          >
            {[...Array(3)].map((_, index) => (
              <option key={index} value={index}>
                Round {index + 1}
              </option>
            ))}
          </select>
          <button
            onClick={exportToCSV}
            className={styles.exportButton}
          >
            Export to CSV
          </button>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Participants</h3>
          <p>{participants.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Qualified Participants</h3>
          <p>{participants.filter(p => p.qualified).length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Average Score</h3>
          <p>
            {participants.length > 0
              ? (participants.reduce((acc, p) => acc + p.score, 0) / participants.length).toFixed(2)
              : 0}%
          </p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.participantsTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Email</th>
              <th>Score</th>
              <th>Time (s)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr
                key={participant.userId}
                className={participant.qualified ? styles.qualified : ''}
              >
                <td>{index + 1}</td>
                <td>{participant.displayName}</td>
                <td>{participant.email}</td>
                <td>{participant.score}%</td>
                <td>{Math.round(participant.completionTime)}</td>
                <td>
                  <span className={`${styles.status} ${participant.qualified ? styles.qualifiedBadge : styles.notQualifiedBadge}`}>
                    {participant.qualified ? 'Qualified' : 'Not Qualified'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizParticipants; 