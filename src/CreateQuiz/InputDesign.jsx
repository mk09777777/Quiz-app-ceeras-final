"use client";
import React, { useState } from "react";
import { collection, addDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebaseconfig"; // Add auth import
import styles from "./InputDesign.module.css";
import QuizHeader from "./QuizHeader";
import QuizTabs from "./QuizTabs";
import QuizForm from "./QuizForm";
import QuestionsSection from "./QuestionsSection";
import PreviewPanel from "./PreviewPanel";
import QuizFooter from "./QuizFooter";

function InputDesign() {
  const [quizLink, setQuizLink] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [rounds, setRounds] = useState([{
    questions: [],
    settings: {
      qualifyingCount: 1,
      timePerQuestion: 30,
      minScore: 0,
      startTime: '',
      endTime: ''
    }
  }]);
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    timeLimit: { hours: "", minutes: "" },
    category: "",
    rounds: "1",
    activationTime: "",
    questionInterval: 0,
  });

  const handleInputChange = (field, value) => {
    setQuizData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTimeChange = (field, value) => {
    setQuizData((prev) => ({
      ...prev,
      timeLimit: {
        ...prev.timeLimit,
        [field]: value,
      },
    }));
  };

  const handleAddQuestion = (roundIndex) => {
    setRounds(prevRounds => {
      const newRounds = [...prevRounds];
      const questions = newRounds[roundIndex].questions;
      const newQuestionId = questions.length > 0
        ? Math.max(...questions.map(q => q.id)) + 1
        : 1;

      newRounds[roundIndex].questions.push({
        id: newQuestionId,
        text: "",
        type: "Multiple Choice",
        options: [
          { id: 1, text: "", isCorrect: false },
          { id: 2, text: "", isCorrect: false },
        ],
      });

      return newRounds;
    });
  };

  const handleRemoveQuestion = (roundIndex, questionId) => {
    setRounds(prevRounds => {
      const newRounds = [...prevRounds];
      newRounds[roundIndex].questions = newRounds[roundIndex].questions.filter(
        q => q.id !== questionId
      );
      return newRounds;
    });
  };

  const handleQuestionChange = (roundIndex, questionId, field, value) => {
    setRounds(prevRounds => {
      const newRounds = [...prevRounds];
      newRounds[roundIndex].questions = newRounds[roundIndex].questions.map(q =>
        q.id === questionId ? { ...q, [field]: value } : q
      );
      return newRounds;
    });
  };

  const handleOptionChange = (roundIndex, questionId, optionId, field, value) => {
    setRounds(prevRounds => {
      const newRounds = [...prevRounds];
      newRounds[roundIndex].questions = newRounds[roundIndex].questions.map(q =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map(opt =>
                opt.id === optionId ? { ...opt, [field]: value } : opt
              ),
            }
          : q
      );
      return newRounds;
    });
  };

  const handleAddOption = (roundIndex, questionId) => {
    setRounds(prevRounds => {
      const newRounds = [...prevRounds];
      newRounds[roundIndex].questions = newRounds[roundIndex].questions.map(q => {
        if (q.id === questionId) {
          const newOptionId = q.options.length > 0
            ? Math.max(...q.options.map(opt => opt.id)) + 1
            : 1;
          return {
            ...q,
            options: [...q.options, { id: newOptionId, text: "", isCorrect: false }],
          };
        }
        return q;
      });
      return newRounds;
    });
  };

  const handleRemoveOption = (roundIndex, questionId, optionId) => {
    setRounds(prevRounds => {
      const newRounds = [...prevRounds];
      newRounds[roundIndex].questions = newRounds[roundIndex].questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.filter(opt => opt.id !== optionId),
          };
        }
        return q;
      });
      return newRounds;
    });
  };

  const handleSetCorrectOption = (roundIndex, questionId, optionId) => {
    setRounds(prevRounds => {
      const newRounds = [...prevRounds];
      newRounds[roundIndex].questions = newRounds[roundIndex].questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.map(opt => ({
              ...opt,
              isCorrect: opt.id === optionId,
            })),
          };
        }
        return q;
      });
      return newRounds;
    });
  };

  const handleRoundSettingChange = (roundIndex, field, value) => {
    setRounds(prevRounds => {
      const newRounds = [...prevRounds];
      if (!newRounds[roundIndex]) {
        return prevRounds;
      }
      newRounds[roundIndex] = {
        ...newRounds[roundIndex],
        settings: {
          ...newRounds[roundIndex].settings,
          [field]: field.includes('Time') ? value : parseInt(value)
        }
      };
      return newRounds;
    });
  };

  const handleAddRound = () => {
    setRounds(prevRounds => [...prevRounds, {
      questions: [],
      settings: {
        qualifyingCount: 1,
        timePerQuestion: 30,
        minScore: 0,
        startTime: '',
        endTime: ''
      }
    }]);
    setQuizData(prev => ({
      ...prev,
      rounds: String(Number(prev.rounds) + 1)
    }));
  };

  const handleFinish = async () => {
    try {
      const quizId = `${new Date().getTime()}-${Math.random().toString(36).substring(2, 8)}`;
      const quizRef = doc(db, 'quizzes', quizId);
      
      await setDoc(quizRef, {
        ...quizData,
        rounds: rounds.map(round => ({
          ...round,
          settings: {
            ...round.settings,
            startTime: round.settings.startTime,
            endTime: round.settings.endTime
          }
        })),
        createdAt: serverTimestamp(),
        id: quizId
      });

      const generatedLink = `${window.location.origin}/quiz/${quizId}`;
      setQuizLink(generatedLink);
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Failed to save quiz. Please try again.");
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem("quizDraft", JSON.stringify(quizData));
    alert("Quiz draft saved successfully!");
  };

  const handlePublishQuiz = async () => {
    try {
      if (!auth.currentUser) {
        alert("Please sign in to publish a quiz");
        return;
      }

      const enhancedQuizData = {
        ...quizData,
        createdBy: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName || 'Anonymous'
        },
        createdAt: new Date().toISOString(),
        status: 'active'
      };

      const quizRef = collection(db, "quizzes");
      const docRef = await addDoc(quizRef, enhancedQuizData);
      
      console.log("Quiz created with ID:", docRef.id);
      setQuizLink(`${window.location.origin}/quiz/${docRef.id}`);
      alert("Quiz published successfully!");
    } catch (error) {
      console.error("Error publishing quiz: ", error);
      alert(`Failed to publish quiz: ${error.message}`);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=REM:wght@400;500;700&family=Righteous&display=swap"
        rel="stylesheet"
      />
      <main className={styles.container}>
        <QuizHeader
          onSaveDraft={handleSaveDraft}
          onPublishQuiz={handlePublishQuiz}
        />
        <hr className={styles.divider} />
        <QuizTabs currentStep={currentStep} />

        <section className={styles.mainContent}>
          {currentStep === 1 && (
            <QuizForm
              quizData={quizData}
              onInputChange={handleInputChange}
              onTimeChange={handleTimeChange}
            />
          )}
          {currentStep === 2 && (
            <QuestionsSection
              rounds={rounds}
              onQuestionChange={handleQuestionChange}
              onOptionChange={handleOptionChange}
              onAddQuestion={handleAddQuestion}
              onRemoveQuestion={handleRemoveQuestion}
              onAddOption={handleAddOption}
              onRemoveOption={handleRemoveOption}
              onSetCorrectOption={handleSetCorrectOption}
              onRoundSettingChange={handleRoundSettingChange}
              onAddRound={handleAddRound}
            />
          )}
          {currentStep === 3 && <PreviewPanel quizData={quizData} rounds={rounds} />}
        </section>

        <QuizFooter
          quizLink={quizLink}
          currentStep={currentStep}
          onBack={handleBack}
          onNext={handleNext}
          onSaveDraft={handleSaveDraft}
          onFinish={handleFinish}
          quizData={quizData}
        />
      </main>
    </>
  );
}

export default InputDesign;
