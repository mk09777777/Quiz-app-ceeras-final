"use client";
import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import QuizCard from "./QuizCard";

const QuizSection = () => {
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [difficultyFilter, setDifficultyFilter] = useState("All Difficulties");

  // Mock quiz data
  const quizzes = [
    {
      id: 1,
      title: "Mathematics Basics",
      description:
        "Test your fundamental mathematics knowledge with this comprehensive quiz.",
      difficulty: "Beginner",
      difficultyBadge:
        '<svg width="85" height="35" viewBox="0 0 85 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="difficulty-badge"> <mask id="mask0_144_1851" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="3" width="85" height="30"> <path d="M84.6406 3.04688H0V33H84.6406V3.04688Z" fill="white"></path> </mask> <g mask="url(#mask0_144_1851)"> <path d="M84.6406 3.04688H0V33H84.6406V3.04688Z" fill="#F9F9F9"></path> <path d="M64.1734 3.04688H20.4673C9.1635 3.04688 0 9.75211 0 18.0234C0 26.2948 9.1635 33 20.4673 33H64.1734C75.4771 33 84.6406 26.2948 84.6406 18.0234C84.6406 9.75211 75.4771 3.04688 64.1734 3.04688Z" fill="#DCFCE7"></path> </g> <text fill="#166534" xml:space="preserve" style="white-space: pre" font-family="REM" font-size="12" letter-spacing="0px"><tspan x="16.6406" y="22.26">Beginner</tspan></text> </svg>',
      duration: "30min",
      isLocked: false,
    },
    {
      id: 2,
      title: "Science Quiz",
      description:
        "Explore various scientific concepts through this engaging quiz.",
      difficulty: "Intermediate",
      difficultyBadge:
        '<svg width="117" height="35" viewBox="0 0 117 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="difficulty-badge"> <mask id="mask0_144_1856" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="3" width="117" height="30"> <path d="M117 3.04688H0V33H117V3.04688Z" fill="white"></path> </mask> <g mask="url(#mask0_144_1856)"> <path d="M117 3.04688H0V33H117V3.04688Z" fill="#F9F9F9"></path> <path d="M88.7078 3.04688H28.2922C12.6668 3.04688 0 9.75211 0 18.0234C0 26.2948 12.6668 33 28.2922 33H88.7078C104.333 33 117 26.2948 117 18.0234C117 9.75211 104.333 3.04688 88.7078 3.04688Z" fill="#ECF89E"></path> </g> <text fill="#166534" xml:space="preserve" style="white-space: pre" font-family="REM" font-size="12" letter-spacing="0px"><tspan x="23.002" y="22.26">Intermediate</tspan></text> </svg>',
      duration: "45min",
      isLocked: false,
    },
    {
      id: 3,
      title: "History Challenge",
      description:
        "Test your knowledge of world history in this advanced quiz.",
      difficulty: "Advanced",
      difficultyBadge:
        '<svg width="85" height="35" viewBox="0 0 85 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="difficulty-badge"> <mask id="mask0_144_1872" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="3" width="85" height="30"> <path d="M84.6406 3.04688H0V33H84.6406V3.04688Z" fill="white"></path> </mask> <g mask="url(#mask0_144_1872)"> <path d="M84.6406 3.04688H0V33H84.6406V3.04688Z" fill="#F9F9F9"></path> <path d="M64.1734 3.04688H20.4673C9.1635 3.04688 0 9.75211 0 18.0234C0 26.2948 9.1635 33 20.4673 33H64.1734C75.4771 33 84.6406 26.2948 84.6406 18.0234C84.6406 9.75211 75.4771 3.04688 64.1734 3.04688Z" fill="#FEE2E2"></path> </g> <text fill="#650406" xml:space="preserve" style="white-space: pre" font-family="REM" font-size="12" letter-spacing="0px"><tspan x="16.6406" y="22.26">Advanced</tspan></text> </svg>',
      duration: "60min",
      isLocked: true,
    },
  ];

  // Handle filter changes
  const handleSubjectFilter = (subject) => {
    setSubjectFilter(subject);
    // In a real app, this would filter the quizzes based on subject
  };

  const handleDifficultyFilter = (difficulty) => {
    setDifficultyFilter(difficulty);
    // In a real app, this would filter the quizzes based on difficulty
  };

  // Handle starting a quiz
  const handleStartQuiz = (quizId) => {
    // In a real app, this would navigate to the quiz page
    console.log(`Starting quiz ${quizId}`);
  };

  return (
    <section className={styles.quizzesSection} aria-labelledby="quizzes-title">
      <div className={styles.sectionHeader}>
        <h2 id="quizzes-title" className={styles.sectionTitle}>
          Available Quizzes
        </h2>
        <div className={styles.filters} role="group" aria-label="Quiz filters">
          <button
            className={styles.filterButton}
            onClick={() => handleSubjectFilter("All Subjects")}
            aria-pressed={subjectFilter === "All Subjects"}
          >
            All Subjects
          </button>
          <button
            className={styles.filterButton}
            onClick={() => handleDifficultyFilter("All Difficulties")}
            aria-pressed={difficultyFilter === "All Difficulties"}
          >
            All Difficulties
          </button>
        </div>
      </div>
      <div className={styles.quizCards}>
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            description={quiz.description}
            difficultyBadge={quiz.difficultyBadge}
            duration={quiz.duration}
            isLocked={quiz.isLocked}
            onStartQuiz={handleStartQuiz}
          />
        ))}
      </div>
    </section>
  );
};

export default QuizSection;
