import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizPage() {
  const navigate = useNavigate();
  const handleSubmitQuiz = () => {
    navigate('/student/results');
  };

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(5);
  const [markedForReview, setMarkedForReview] = useState(false);
  const [timeLeft, setTimeLeft] = useState(44 * 60 + 59);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setMarkedForReview(false);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    setSelectedAnswer(null);
    setMarkedForReview(false);
  };

  const handleMarkForReview = () => {
    setMarkedForReview(!markedForReview);
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1024px', margin: 'auto', padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'relative' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '600' }}>Mathematics Quiz</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '16px' }}>{formatTime(timeLeft)}</span>
            <button style={{ backgroundColor: '#14b8a6', color: 'white', fontWeight: '600', padding: '8px 16px', borderRadius: '4px' }} onClick={handleSubmitQuiz}>
              Submit Quiz
            </button>
          </div>
          <div style={{ borderBottom: '1px solid #d1d5db', position: 'absolute', width: '100%', bottom: '0', left: '0' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '14px' }}>Question {currentQuestion} of 20</span>
                <button onClick={handleMarkForReview} style={{ fontSize: '14px', color: '#3b82f6' }}>
                  {markedForReview ? 'Unmark for review' : 'Mark for review'}
                </button>
              </div>
              <p style={{ fontWeight: '600' }}>What is the value of x in the equation: 2x + 5 = 15?</p>
              <div style={{ marginTop: '16px' }}>
                {['5', '10', '7', '8'].map((answer) => (
                  <label key={answer} style={{ display: 'flex', alignItems: 'center', width: '100%', border: '1px solid #d1d5db', padding: '12px', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="answer" value={answer} checked={selectedAnswer === answer} onChange={() => handleAnswerSelect(answer)} style={{ marginRight: '8px' }} />
                    <span>{`x = ${answer}`}</span>
                  </label>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={handlePreviousQuestion} disabled={currentQuestion === 1} style={{ backgroundColor: '#e5e7eb', color: '#374151', fontWeight: '600', padding: '8px 16px', borderRadius: '4px' }}>
                  ← Previous
                </button>
                <button onClick={handleNextQuestion} disabled={currentQuestion === 20} style={{ backgroundColor: '#14b8a6', color: 'white', fontWeight: '600', padding: '8px 16px', borderRadius: '4px' }}>
                  Next
                </button>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontWeight: '600', marginBottom: '16px' }}>Question Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '16px' }}>
              {[...Array(20)].map((_, index) => (
                <div key={index} style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: index + 1 === currentQuestion ? '#14b8a6' : '#e5e7eb', color: index + 1 === currentQuestion ? 'white' : '#374151' }}>
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
