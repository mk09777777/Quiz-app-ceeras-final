import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './RoundComplete.module.css';

const RoundComplete = () => {
  const location = useLocation();
  const { score, roundCompleted, qualified, nextRoundLink } = location.state;

  return (
    <div className={styles.container}>
      <h1>Round {roundCompleted + 1} Complete</h1>
      <div className={styles.score}>Your Score: {score}%</div>
      
      {qualified ? (
        <div className={styles.qualified}>
          <h2>Congratulations! You've qualified for the next round!</h2>
          <Link to={nextRoundLink} className={styles.nextRoundButton}>
            Proceed to Next Round
          </Link>
        </div>
      ) : (
        <div className={styles.notQualified}>
          <h2>Thank you for participating!</h2>
          <p>Unfortunately, you didn't qualify for the next round.</p>
        </div>
      )}
    </div>
  );
};

export default RoundComplete; 