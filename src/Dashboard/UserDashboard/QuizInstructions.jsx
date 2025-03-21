import React, { useState } from 'react';
import { IoWifi } from 'react-icons/io5';
import { MdOutlineComputer } from 'react-icons/md';
import { IoMdNotificationsOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function QuizInstructions() {
  const[terms,setterms]=useState(false)
  const navigate = useNavigate();
  
  const handleStartQuiz = () => {
   if(terms===true){
    navigate('/student/quiz');
   }
   else{
    alert("please click on terms and conditions checkbox")
   }
  };
  
  return (
    <div style={{ fontFamily: 'sans-serif', WebkitFontSmoothing: 'antialiased', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: 'auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Instructions</h1>

        <button onClick={()=>navigate('/')} style={{ backgroundColor: 'white', border: '1px solid #3b82f6', color: '#3b82f6', padding: '0.5rem 1rem', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18"  />
          </svg>
          Back to Dashboard
        </button>

        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Advanced JavaScript Fundamentals</h2>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Web Development • Advanced Level</p>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>60 minutes</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {[{ img: '/question.png', label: 'Questions', value: '25' }, { img: '/star.png', label: 'Total Points', value: '100' }, { img: '/pascore.png', label: 'Passing Score', value: '70%' }].map((item, index) => (
              <div key={index} style={{ backgroundColor: '#f3f4f6', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                <img src={item.img} alt={item.label} style={{ height: '1.5rem', width: '1.5rem', marginBottom: '0.5rem' }} />
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.label}</p>
                <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#6b7280' }}>{item.value}</p>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Quiz Instructions</h3>
          {[{ img: '/tick.png', text: 'Each question must be answered in order, no skipping allowed.' }, { img: '/timer.png', text: 'Quiz will automatically submit when the time limit is reached.' }, { img: '/loading.png', text: 'You have one attempt to complete this quiz' }, { img: '/calculator.png', text: 'Each correct answer is worth 4 points.' }].map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#374151' }}>
              <img src={item.img} alt={item.text} style={{ height: '1.5rem', width: '1.5rem', marginRight: '0.5rem' }} />
              <span>{item.text}</span>
            </div>
          ))}

          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Before You Begin</h3>
          {[{ Icon: IoWifi, text: 'Ensure you have a stable internet connection.' }, { Icon: MdOutlineComputer, text: 'Use a desktop or laptop computer for the best experience.' }, { Icon: IoMdNotificationsOff, text: 'Turn off notifications and eliminate distractions.' }].map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#374151' }}>
              <item.Icon style={{ marginRight: '0.5rem' }} />
              <span>{item.text}</span>
            </div>
          ))}

          <img src="/line.png" alt="Separator" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', color: '#374151' }}>
              <input type="checkbox" style={{ height: '1.25rem', width: '1.25rem', color: '#3b82f6', marginRight: '0.5rem' }} onChange={()=>setterms(true)} />
              <span style={{ fontSize: '0.875rem' }}>I have read and understand the instructions</span>
            </label>
            <button style={{ backgroundColor: '#3b82f6', color: 'white', fontWeight: '600', padding: '0.5rem 1rem', borderRadius: '0.375rem' }} onClick={handleStartQuiz}>
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizInstructions;
