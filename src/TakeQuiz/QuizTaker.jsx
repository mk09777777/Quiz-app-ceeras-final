import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseconfig'; // Ensure you have Firebase configured
import { useParams, useLocation } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import styles from './QuizTaker.module.css';

const QuizTaker = () => {
  const navigate = useNavigate();
  const user = auth.currentUser; // Get the current user

  useEffect(() => {
    if (!user || user.role !== 'student') {
      setShowLogin(true); // Set state to show UserLogin component if not authenticated or not a student
    }
  }, [user, navigate]);

  const { id } = useParams(); // Fetch quiz ID from URL parameters
  const [showLogin, setShowLogin] = useState(false); // State to control UserLogin visibility

  const location = useLocation();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentRound, setCurrentRound] = useState(location.state?.roundIndex || 0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionTimer, setQuestionTimer] = useState(null);
  const [canProceed, setCanProceed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [qualified, setQualified] = useState(true);
  const [roundQuestions, setRoundQuestions] = useState([]);
  const [roundAvailable, setRoundAvailable] = useState(false);
  const [roundEnded, setRoundEnded] = useState(false);
  const [transitionTimer, setTransitionTimer] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextRoundLink, setNextRoundLink] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [waitingForRound, setWaitingForRound] = useState(true);
  const [roundStartTime, setRoundStartTime] = useState(null);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizDoc = await getDoc(doc(db, 'quizzes', id));
        if (!quizDoc.exists()) {
          throw new Error('Quiz not found');
        }

        const quizData = quizDoc.data();
        console.log('Fetched quiz data:', quizData); // Log the fetched quiz data for debugging

        // Validate quiz data structure
        if (!quizData.rounds || !Array.isArray(quizData.rounds)) {
          throw new Error('Invalid quiz format');
        }

        setQuiz(quizData);
        setRoundQuestions(quizData.rounds[currentRound].questions || []);
        setQuestionTimer(quizData.rounds[currentRound].settings.timePerQuestion || 30);
        setStartTime(Date.now());

        // Check qualification for current round
        if (currentRound > 0) {
          const prevRoundResults = quizData.roundResults?.[currentRound - 1] || [];
          const sortedResults = [...prevRoundResults].sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.completionTime - b.completionTime;
          });

          const userId = localStorage.getItem('userId');
          const userRank = sortedResults.findIndex(result => result.userId === userId);
          const qualifyingCount = quizData.rounds[currentRound - 1].qualifyingCount;

          if (userRank === -1 || userRank >= qualifyingCount) {
            setError('You did not qualify for this round');
            setQualified(false);
          }
        }
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id, currentRound]);

  // Single timer effect for question timing
  useEffect(() => {
    if (!quiz || !roundQuestions.length || !roundAvailable || waitingForRound || isTransitioning) return;

    // Set initial time when question first appears
    const questionDuration = quiz.rounds[currentRound].settings.timePerQuestion * 1000;
    setQuestionStartTime(Date.now());
    const endTime = Date.now() + questionDuration;

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = Math.ceil((endTime - now) / 1000);

      if (remaining <= 0) {
        clearInterval(timer);
        handleQuestionTimeout();
      } else {
        setQuestionTimer(remaining);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentQuestion, roundAvailable, waitingForRound, isTransitioning]);

  const handleQuestionTimeout = async () => {
    setIsTransitioning(true);
    
    // Wait for the exact specified time before moving to next question
    const transitionDuration = quiz.rounds[currentRound].settings.timePerQuestion;
    
    // If answer wasn't submitted, record no answer
    if (!submitted) {
      setAnswers(prev => ({
        ...prev,
        [`round${currentRound}_q${currentQuestion}`]: {
          answer: null,
          timeToAnswer: transitionDuration
        }
      }));
    }

    // Wait for the full duration even if answer was submitted early
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second transition

    setIsTransitioning(false);
    if (currentQuestion < roundQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSubmitted(false);
      setCanProceed(false);
    } else {
      handleRoundComplete();
    }
  };

  // Modify the round start check
  useEffect(() => {
    const checkRoundStart = async () => {
      try {
        const quizDoc = await getDoc(doc(db, 'quizzes', id));
        const quizData = quizDoc.data();
        
        if (!quizData.rounds || !quizData.rounds[currentRound]) {
          setError("Round not found");
          return;
        }
        
        const roundSettings = quizData.rounds[currentRound].settings || {};
        const scheduledStartTime = roundSettings.startTime 
          ? new Date(roundSettings.startTime) 
          : null;
        
        setRoundStartTime(scheduledStartTime);
        
        // Check if this specific round is started or scheduled time has passed
        if (
          roundSettings.started || 
          (scheduledStartTime && Date.now() >= scheduledStartTime.getTime())
        ) {
          setWaitingForRound(false);
          setRoundAvailable(true);
        } else {
          setWaitingForRound(true);
          setRoundAvailable(false);
        }
      } catch (error) {
        console.error('Error checking round start:', error);
        setError("Failed to check round status");
      }
    };

    const interval = setInterval(checkRoundStart, 1000);
    return () => clearInterval(interval);
  }, [id, currentRound]);

  const handleAnswerSelect = (optionIndex) => {
    if (!user || submitted) return;

    const timeToAnswer = (Date.now() - questionStartTime) / 1000;
    setAnswers(prev => ({
      ...prev,
      [`round${currentRound}_q${currentQuestion}`]: {
        answer: optionIndex,
        timeToAnswer
      }
    }));
    setSubmitted(true);
    setCanProceed(true);
  };

  const calculateRoundScore = () => {
    let correct = 0;
    roundQuestions.forEach((question, index) => {
      const answerKey = `round${currentRound}_q${index}`;
      const userAnswer = answers[answerKey];
      if (userAnswer !== undefined && question.options[userAnswer]?.isCorrect) {
        correct++;
      }
    });
    return Math.round((correct / roundQuestions.length) * 100);
  };

  // Modify checkQualification to consider time
  const checkQualification = async (roundScore, completionTime) => {
    try {
      const quizDoc = await getDoc(doc(db, 'quizzes', id));
      const quizData = quizDoc.data();
      
      const currentRoundResults = quizData.roundResults?.[currentRound] || [];
      const sortedResults = [...currentRoundResults].sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.completionTime - b.completionTime; // Consider completion time for tiebreaker
      });
      
      const userId = localStorage.getItem('userId');
      const userRank = sortedResults.findIndex(result => result.userId === userId);
      const qualifyingCount = quizData.rounds[currentRound].settings.qualifyingCount;

      if (userRank !== -1 && userRank < qualifyingCount) {
        const nextRoundLink = `/quiz/${id}?round=${currentRound + 1}`;
        setNextRoundLink(nextRoundLink);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking qualification:', error);
      return false;
    }
  };

  // Modify handleRoundComplete
  const handleRoundComplete = async () => {
    try {
      const roundScore = calculateRoundScore();
      const completionTime = (Date.now() - startTime) / 1000;

      // Update round results in Firestore
      const quizRef = doc(db, 'quizzes', id);
      await updateDoc(quizRef, {
        [`roundResults.${currentRound}`]: arrayUnion({
          userId: localStorage.getItem('userId'),
          userName: localStorage.getItem('displayName'),
          score: roundScore,
          completionTime,
          submittedAt: new Date().toISOString()
        })
      });

      // Check qualification for next round
      const qualified = await checkQualification(roundScore, completionTime);

      // Navigate to round completion dashboard with qualification status
      navigate('/round-complete', {
        state: {
          quizId: id,
          roundCompleted: currentRound,
          score: roundScore,
          completionTime,
          qualified,
          nextRoundLink: qualified ? nextRoundLink : null
        }
      });

    } catch (error) {
      console.error('Error completing round:', error);
      setError('Failed to submit round results');
    }
  };

  // Add transition timer effect
  useEffect(() => {
    if (!isTransitioning || transitionTimer === null) return;

    const timer = setInterval(() => {
      setTransitionTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTransitioning, transitionTimer]);

  // Update the waiting message
  if (waitingForRound) {
    return (
      <div className={styles.waitingMessage}>
        <div className={styles.iconcontainer} >
          <img
          src="../back.png"
          className={styles.icon1}
          />
            <img
          src="../refresh.png"
          className={styles.icon2}
          />
        </div>
        <h2 style={{color:"white"}}>Round {currentRound + 1} Not Started</h2>
        <div className={styles.startInfo}>
          {roundStartTime ? (
            <>
              <p>This round will start at:</p>
              <h3>{roundStartTime.toLocaleString()}</h3>
              <p>Please wait for the scheduled start time or admin activation.</p>
            </>
          ) : (
            <p style={{color:"white"}}>Waiting for admin to start this round....
            <img
            src="../hourclock.png"
            style={{height:"18px",width:"18px"}}
            /></p>
          )}
        </div>
        <div className={styles.roundInfo}>
          <p>Total Rounds: {quiz?.rounds?.length || 0}</p>
          <p>Current Round: {currentRound + 1}</p>
        </div>
      </div>
    );
  }

  if (loading) return <div className={styles.loading}>Loading quiz...</div>;

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        {!roundAvailable && !roundEnded && (
          <p>Please wait for the round to start.</p>
        )}
        {roundEnded && (
          <p>This round has ended. Please check if you qualified for the next round.</p>
        )}
      </div>
    );
  }
  if (!qualified) return <div className={styles.error}>You did not qualify for this round</div>;
  if (!quiz || !roundQuestions.length) return <div className={styles.error}>Invalid quiz data</div>;
  if (!roundAvailable) return <div className={styles.waiting}>Waiting for round to start...</div>;

  const currentQuestionData = roundQuestions[currentQuestion];
  if (!currentQuestionData) return <div className={styles.error}>Question not found</div>;

  return (
    <div className={styles.quizContainer}>
      <div className={styles.header}>
        <h1>{quiz.title} - Round {currentRound + 1}</h1>
        <div className={styles.timer}>Time remaining: {questionTimer}s</div>
      </div>

      <div className={styles.questionCard}>
        <h2>Question {currentQuestion + 1} of {roundQuestions.length}</h2>
        <p className={styles.questionText}>{currentQuestionData.text}</p>

        <div className={styles.options}>
          {currentQuestionData.options?.map((option, index) => (
            <button
              key={index}
              className={`${styles.option} ${answers[`round${currentRound}_q${currentQuestion}`]?.answer === index ? styles.selected : ''
                } ${submitted ? styles.disabled : ''}`}
              onClick={() => !submitted && handleAnswerSelect(index)}
              disabled={submitted || isTransitioning}
            >
              {option.text}
            </button>
          )) || <p className={styles.error}>No options available</p>}
        </div>

        {submitted && (
          <div className={styles.waitingNext}>
            <p>Answer submitted. Waiting for timer to complete...</p>
            <div className={styles.progressBar}>
              <div 
                className={styles.progress} 
                style={{ 
                  width: `${(questionTimer / (quiz.rounds[currentRound].settings.timePerQuestion)) * 100}%` 
                }}
              />
            </div>
          </div>
        )}

        {isTransitioning && (
          <div className={styles.transitionMessage}>
            <p>Moving to next question...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizTaker;