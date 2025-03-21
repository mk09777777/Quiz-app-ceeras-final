"use client";
import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import StatCard from "./StatCard";
import QuizItem from "./QuizItem";
import UserRequestRow from "./UserRequestRow";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { collection, getDocs, query, where, doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import QuizParticipants from '../components/QuizParticipants';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const displayName = localStorage.getItem("displayName") || "User";

  const [quizStats, setQuizStats] = useState({
    totalUsers: 0,
    activeQuizzes: 0,
    completedQuizzes: 0,
    pendingRequests: 0
  });
  const [submissions, setSubmissions] = useState([]);
  const [quizParticipation, setQuizParticipation] = useState({});
  const [roundStats, setRoundStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionOptions, setNewQuestionOptions] = useState(['']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [roundTime, setRoundTime] = useState('');

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizSnapshot = await getDocs(collection(db, "quizzes"));
        let participationData = {};
        let roundStatistics = {};
        let totalActiveQuizzes = 0;
        let totalCompletedQuizzes = 0;

        for (const doc of quizSnapshot.docs) {
          const quiz = doc.data();
          const quizId = doc.id;
          
          // Ensure quiz.rounds is an array
          const rounds = Array.isArray(quiz.rounds) ? quiz.rounds : [];
          
          // Fetch participation data for this quiz
          const participationSnapshot = await getDocs(
            query(collection(db, "quizParticipation"), where("quizId", "==", quizId))
          );

          const quizParticipants = participationSnapshot.docs.map(doc => doc.data());

          // Calculate round statistics
          const roundStats = rounds.map((round, index) => {
            // Ensure roundResults exists and is an array
            const roundResults = Array.isArray(quiz.roundResults?.[index]) 
              ? quiz.roundResults[index] 
              : [];

            const qualified = roundResults.filter(result => {
              if (!result.score) return false;
              const rank = roundResults.filter(r => (r.score || 0) > result.score).length + 1;
              return rank <= (round.settings?.qualifyingCount || 0);
            });

            return {
              totalParticipants: roundResults.length,
              qualifiedCount: qualified.length,
              averageScore: roundResults.length > 0 
                ? roundResults.reduce((acc, curr) => acc + (curr.score || 0), 0) / roundResults.length 
                : 0
            };
          });

          participationData[quizId] = quizParticipants;
          roundStatistics[quizId] = roundStats;

          // Update quiz status counts
          if (quiz.status === 'active') totalActiveQuizzes++;
          if (quiz.status === 'completed') totalCompletedQuizzes++;
        }

        // Update stats
        setQuizStats(prev => ({
          ...prev,
          activeQuizzes: totalActiveQuizzes,
          completedQuizzes: totalCompletedQuizzes
        }));

        setQuizParticipation(participationData);
        setRoundStats(roundStatistics);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  useEffect(() => {
      
    const fetchQuizzes = async () => {
      try {
        const quizSnapshot = await getDocs(collection(db, "quizzes"));
        const quizzesData = quizSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setQuizzes(quizzesData);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError("Failed to load quizzes");
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizStart = async (quizId) => {
    try {
      const quizRef = doc(db, "quizzes", quizId);
      const quizDoc = await getDoc(quizRef);
      const quizData = quizDoc.data();

      // Update the quiz with started status and actual start time
      await updateDoc(quizRef, {
        started: true,
        startedAt: new Date().toISOString(),
        'rounds.0.settings.startTime': new Date().toISOString() // Start first round immediately
      });
      
      // Update local state
      setQuizParticipation(prev => ({
        ...prev,
        [quizId]: {
          ...prev[quizId],
          started: true
        }
      }));

      console.log('Quiz started successfully');
    } catch (error) {
      console.error("Error starting quiz:", error);
      setError("Failed to start quiz");
    }
  };

  const handleQuizExpand = (quizId) => {
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
  };

  const handleRoundStart = async (quizId, roundIndex) => {
    try {
      const quizRef = doc(db, "quizzes", quizId);
      const quizDoc = await getDoc(quizRef);
      const quizData = quizDoc.data();

      // Create a new rounds array with the updated round
      const updatedRounds = [...quizData.rounds];
      updatedRounds[roundIndex] = {
        ...updatedRounds[roundIndex],
        settings: {
          ...updatedRounds[roundIndex].settings,
          startTime: new Date().toISOString(),
          started: true
        }
      };

      // Update the quiz document
      await updateDoc(quizRef, {
        rounds: updatedRounds,
        lastModified: new Date().toISOString()
      });

      // Update local state
      setQuizzes(prev => prev.map(quiz => {
        if (quiz.id === quizId) {
          const updatedQuiz = {...quiz};
          updatedQuiz.rounds[roundIndex].settings.startTime = new Date().toISOString();
          updatedQuiz.rounds[roundIndex].settings.started = true;
          return updatedQuiz;
        }
        return quiz;
      }));

      console.log(`Round ${roundIndex + 1} started successfully`);
    } catch (error) {
      console.error("Error starting round:", error);
      setError("Failed to start round");
    }
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz.id);
    setQuizTitle(quiz.title);
    setQuizDescription(quiz.description);
    setQuestions(quiz.rounds[currentRoundIndex].questions || []); // Load questions from the current round
    setRoundTime(quiz.rounds[currentRoundIndex].settings.timePerQuestion || '');
  };

  const handleUpdateQuiz = async (quizId) => {
    try {
      const quizRef = doc(db, "quizzes", quizId);
      await updateDoc(quizRef, {
        title: quizTitle,
        description: quizDescription,
        rounds: quizzes.find(q => q.id === quizId).rounds // Keep existing rounds
      });
      setEditingQuiz(null);
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        const quizRef = doc(db, "quizzes", quizId);
        await deleteDoc(quizRef);
        setQuizzes(prev => prev.filter(quiz => quiz.id !== quizId));
      } catch (error) {
        console.error("Error deleting quiz:", error);
      }
    }
  };

  const handleEditQuestion = (index) => {
    setEditingQuestionIndex(index);
    setNewQuestionText(questions[index].text);
    setNewQuestionOptions(questions[index].options || []);
    setCorrectAnswerIndex(questions[index].correctAnswerIndex || 0); // Load the correct answer index
  };

  const handleUpdateQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      text: newQuestionText,
      options: newQuestionOptions,
      correctAnswerIndex: correctAnswerIndex // Update correct answer index
    };
    setQuestions(updatedQuestions);
    setEditingQuestionIndex(null);
    setNewQuestionText('');
    setNewQuestionOptions(['']); // Reset options
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      text: newQuestionText,
      options: newQuestionOptions,
      correctAnswerIndex: correctAnswerIndex // Set the correct answer index
    };
    setQuestions(prev => [...prev, newQuestion]);
    setNewQuestionText('');
    setNewQuestionOptions(['']);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleAddOption = () => {
    setNewQuestionOptions(prev => [...prev, '']); // Add a new empty option
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestionOptions];
    updatedOptions[index] = value;
    setNewQuestionOptions(updatedOptions);
  };

  const handleRoundTimeChange = (e) => {
    setRoundTime(e.target.value);
  };

  const handleUpdateRoundTime = async (quizId, roundIndex) => {
    try {
      const quizRef = doc(db, "quizzes", quizId);
      const updatedRounds = quizzes.find(q => q.id === quizId).rounds;
      updatedRounds[roundIndex].settings.timePerQuestion = roundTime; // Update time
      await updateDoc(quizRef, { rounds: updatedRounds });
      console.log('Round time updated successfully');
    } catch (error) {
      console.error("Error updating round time:", error);
    }
  };

  const renderQuizParticipation = () => {
    if (!Object.keys(roundStats).length) return null;

    return (
      <section className={styles.quizParticipation}>
        <h2 className={styles.sectionHeader}>Quiz Participation Details</h2>
        {Object.entries(roundStats).map(([quizId, rounds]) => (
          <div key={quizId} className={styles.quizStats}>
            <h3>Quiz ID: {quizId}</h3>
            {Array.isArray(rounds) && rounds.map((round, index) => (
              <div key={index} className={styles.roundStats}>
                <h4>Round {index + 1}</h4>
                <div className={styles.statsGrid}>
                  <div>
                    <p>Total Participants: {round.totalParticipants}</p>
                    <p>Qualified Participants: {round.qualifiedCount}</p>
                    <p>Average Score: {round.averageScore.toFixed(2)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    );
  };

  if (loading) {
    return <div className={styles.loading}>Loading dashboard data...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=REM:wght@400;700&family=Righteous&family=Roboto:wght@400;500&display=swap"
      />
      <main className={styles.adminDashboard}>
        <header className={styles.topBar}>
          <div className={styles.notificationIcon}>
            <i className={styles.tiTiBell} aria-hidden="true" />
          </div>
          <div className={styles.adminName}>Welcome {displayName}</div>
        </header>

        <section className={styles.statsContainer} aria-labelledby="stats-heading">
          <StatCard
            label="Total Users"
            value={quizStats.totalUsers.toString()}
            changePercentage="12"
            isPositive={true}
          />
          <StatCard
            label="Active Quizzes"
            value={quizStats.activeQuizzes.toString()}
            changePercentage="8"
            isPositive={true}
          />
          <StatCard
            label="Completed Quizzes"
            value={quizStats.completedQuizzes.toString()}
            changePercentage="24"
            isPositive={true}
          />
          <StatCard
            label="Pending Requests"
            value={quizStats.pendingRequests.toString()}
            changePercentage="5"
            isPositive={false}
          />
        </section>

        <section className={styles.actionButtons}>
          <button className={styles.createQuiz} onClick={() => navigate("/createquiz")}>Create New Quiz</button>
          <button className={styles.manageUsers} onClick={() => navigate("/manageuser")}>
            <i className={styles.tiTiUsers} aria-hidden="true" />
            <span>Manage Users</span>
          </button>
          <button className={styles.viewQuizzes} onClick={() => navigate("/managequiz")}>
            <i className={styles.tiTiList} aria-hidden="true" />
            <span>View All Quizzes</span>
          </button>
        </section>

        <div className={styles.mainContent}>
          <section
            className={styles.competitionRates}
            aria-labelledby="competition-rates-heading"
          >
            <h2 id="competition-rates-heading" className={styles.sectionHeader}>
              Quiz Competition Rates
            </h2>
            <div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/64c472f8f81003ba291af120d4b5e56fefc3de41"
                alt="Competition rates chart"
                className={styles.chartImage}
              />
            </div>
          </section>

          <section
            className={styles.liveQuizzes}
            aria-labelledby="live-quizzes-heading"
          >
            <div className={styles.sectionHeader2}>
              <h2 id="live-quizzes-heading" className={styles.sectionTitle}>
                Live Quizzes
              </h2>
              <div>4 active now</div>
            </div>
            <div className={styles.quizList}>
              {Object.entries(quizParticipation).map(([quizId, quiz]) => (
                <div key={quizId} className={styles.quizItem}>
                  <QuizItem
                    name={`Quiz ${quizId}`}
                    participants={quiz.length}
                    timeLeft="Scheduled"
                    status={quiz.started ? "In Progress" : "Not Started"}
                  />
                  {!quiz.started && (
                    <button 
                      className={styles.startButton}
                      onClick={() => handleQuizStart(quizId)}
                    >
                      Start Quiz
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section
          className={styles.userRequests}
          aria-labelledby="user-requests-heading"
        >
          <h2 id="user-requests-heading" className={styles.sectionHeader3}>
            Recent User Requests
          </h2>
          <div
            className={styles.requestsTable}
            role="table"
            aria-label="User Requests"
          >
            <div className={styles.tableHeader} role="row">
              <div role="columnheader">User</div>
              <div role="columnheader">Request Type</div>
              <div role="columnheader">Status</div>
              <div role="columnheader">Date</div>
              <div role="columnheader">Actions</div>
            </div>
            <UserRequestRow
              userName="Sarah Johnson"
              userEmail="sarah@example.com"
              requestType="Access Request"
              date="2 hours ago"
            />
            <UserRequestRow
              userName="Michael Chen"
              userEmail="michael@example.com"
              requestType="Quiz Creation"
              date="5 hours ago"
            />
          </div>
        </section>

        {/* <section className={styles.recentSubmissions}>
          <h2 className={styles.sectionHeader}>Recent Quiz Submissions</h2>
          <div className={styles.submissionsTable}>
            <div className={styles.tableHeader} role="row">
              <div role="columnheader">Quiz Title</div>
              <div role="columnheader">User</div>
              <div role="columnheader">Score</div>
              <div role="columnheader">Submitted</div>
            </div>
            {submissions.slice(0, 5).map((submission, index) => (
              <div key={index} className={styles.tableRow} role="row">
                <div>{submission.quizTitle}</div>
                <div>{submission.userId}</div>
                <div>{submission.score}%</div>
                <div>{new Date(submission.submittedAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </section> */}

        <section className={styles.participantsSection}>
          <div className={styles.quizSelector}>
            <h2>View Quiz Participants</h2>
            <select 
              onChange={(e) => setSelectedQuiz(e.target.value)}
              value={selectedQuiz || ''}
            >
              <option value="">Select a Quiz</option>
              {Object.keys(roundStats).map((quizId) => (
                <option key={quizId} value={quizId}>
                  Quiz {quizId}
                </option>
              ))}
            </select>
          </div>
          
          {selectedQuiz && (
            <QuizParticipants quizId={selectedQuiz} />
          )}
        </section>

        <section className={styles.quizManagement}>
          <h2 className={styles.sectionHeader}>Manage Quizzes</h2>
          
          {quizzes.length > 0 ? (
            <div className={styles.quizList}>
              {quizzes.map(quiz => (
                <div key={quiz.id} className={styles.quizManagementItem}>
                  <div className={styles.quizHeader}>
                    {editingQuiz === quiz.id ? (
                      <div>
                        <input
                          type="text"
                          value={quizTitle}
                          onChange={(e) => setQuizTitle(e.target.value)}
                        />
                        <textarea
                          value={quizDescription}
                          onChange={(e) => setQuizDescription(e.target.value)}
                        />
                        <button onClick={() => handleUpdateQuiz(quiz.id)}>Save</button>
                        <button onClick={() => setEditingQuiz(null)}>Cancel</button>
                      </div>
                    ) : (
                      <div>
                        <h3>{quiz.title}</h3>
                        <p>{quiz.description}</p>
                        <button onClick={() => handleEditQuiz(quiz)}>Edit</button>
                        <button onClick={() => handleDeleteQuiz(quiz.id)}>Delete</button>
                      </div>
                    )}
                  </div>

                  {editingQuiz === quiz.id && (
                    <div>
                      <h4>Questions</h4>
                      {questions.map((question, index) => (
                        <div key={index}>
                          {editingQuestionIndex === index ? (
                            <div>
                              <input
                                type="text"
                                value={newQuestionText}
                                onChange={(e) => setNewQuestionText(e.target.value)}
                              />
                              <h5>Options</h5>
                              {newQuestionOptions.map((option, optionIndex) => (
                                <div key={optionIndex}>
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                                    placeholder={`Option ${optionIndex + 1}`}
                                  />
                                </div>
                              ))}
                              <button onClick={handleAddOption}>Add Option</button>
                              <select
                                value={correctAnswerIndex}
                                onChange={(e) => setCorrectAnswerIndex(Number(e.target.value))}
                              >
                                {newQuestionOptions.map((_, optionIndex) => (
                                  <option key={optionIndex} value={optionIndex}>
                                    Option {optionIndex + 1}
                                  </option>
                                ))}
                              </select>
                              <button onClick={() => handleUpdateQuestion(index)}>Save</button>
                              <button onClick={() => setEditingQuestionIndex(null)}>Cancel</button>
                              <button onClick={() => handleDeleteQuestion(index)}>Delete</button>
                            </div>
                          ) : (
                            <div>
                              <span>{question.text}</span>
                              <button onClick={() => handleEditQuestion(index)}>Edit</button>
                            </div>
                          )}
                        </div>
                      ))}
                      <h4>Add New Question</h4>
                      <input
                        type="text"
                        value={newQuestionText}
                        onChange={(e) => setNewQuestionText(e.target.value)}
                        placeholder="New question text"
                      />
                      <h5>Options</h5>
                      {newQuestionOptions.map((option, index) => (
                        <div key={index}>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                          />
                        </div>
                      ))}
                      <button onClick={handleAddOption}>Add Option</button>
                      <select
                        value={correctAnswerIndex}
                        onChange={(e) => setCorrectAnswerIndex(Number(e.target.value))}
                      >
                        {newQuestionOptions.map((_, optionIndex) => (
                          <option key={optionIndex} value={optionIndex}>
                            Option {optionIndex + 1}
                          </option>
                        ))}
                      </select>
                      <button onClick={handleAddQuestion}>Add Question</button>
                      <h4>Round Settings</h4>
                      <input
                        type="number"
                        value={roundTime}
                        onChange={handleRoundTimeChange}
                        placeholder="Time per question (seconds)"
                      />
                      <button onClick={() => handleUpdateRoundTime(quiz.id, currentRoundIndex)}>Update Round Time</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No quizzes found</p>
          )}
        </section>

        {/* {renderQuizParticipation()} */}
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
