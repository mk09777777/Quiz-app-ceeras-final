import React from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { FaShareNodes } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function QuizResults() {
  const navigate = useNavigate();
  const handleclick=()=>{
navigate("/student")    

  }
  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1024px', margin: 'auto', padding: '32px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '600' }}>Quiz Results</h1>
            <input style={{ backgroundColor: '#22c55e', color: 'white', padding: '8px 16px', borderRadius: '4px' }} onClick={handleclick}
              type="button" value={"Dashboard"}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{ backgroundColor: '#bbf7d0', color: '#166534', padding: '4px 8px', borderRadius: '999px', fontSize: '14px' }}>Passed</span>
            <span style={{ fontSize: '14px', color: '#4b5563' }}>Completed on March 15, 2024</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
            {[
              { value: '85%', label: 'Overall Score' },
              { value: '17/20', label: 'Correct Answers' },
              { value: '12:30', label: 'Time Taken' }
            ].map((item, index) => (
              <div key={index} style={{ backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '32px', fontWeight: '700', color: '#4f46e5' }}>{item.value}</span>
                <p style={{ fontSize: '14px', color: '#4b5563' }}>{item.label}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Question Review</h2>

          {[
            { question: 'What is the capital of France?', answer: 'Paris', status: 'Correct', color: '#bbf7d0', textColor: '#166534', icon: '/tick.png' },
            { question: 'Which planet is known as the Red Planet?', answer: 'Venus', correct: 'Mars', status: 'Incorrect', color: '#fecaca', textColor: '#b91c1c', icon: '/incorrect.png' }
          ].map((q, index) => (
            <div key={index} style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '16px', marginBottom: '16px', backgroundColor: q.color }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: '600' }}>Question {index + 1}</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={q.icon} style={{ marginRight: '8px' }} alt="status-icon" />
                  <span style={{ backgroundColor: q.color, color: q.textColor, padding: '4px 8px', borderRadius: '999px', fontSize: '14px' }}>{q.status}</span>
                </div>
              </div>
              <p style={{ color: 'black', marginBottom: '8px' }}>{q.question}</p>
              <p style={{ color: q.textColor }}>Your answer: {q.answer}</p>
              {q.correct && <p style={{ color: 'black' }}>Correct Answer: {q.correct}</p>}
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            <button style={{ backgroundColor: '#e5e7eb', color: '#374151', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
              <IoSearchOutline style={{ marginRight: '8px' }} />
              Review Answers
            </button>
            <button style={{ backgroundColor: '#6366f1', color: 'white', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
              <FaShareNodes style={{ marginRight: '8px' }} />
              Share Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizResults;
