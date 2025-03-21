import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "../firebaseconfig";// Ensure correct import path
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import LoadingPage from "./LandingPage2/LoadingPage";
import LoginContainer from "./LoginPage/LoginContainer"; // Login Page
import Container from "./SigninPage/Container"; // Sign-in Page
import AdminDashboard from "./Dashboard/AdminDashboard";
import InputDesign from "./CreateQuiz/InputDesign";
import Dashboard from "./ManageQuiz/Dashboard";
import UserManagementDashboard from "./ManageUser/UserManagementDashboard";
import QuizInstructions from "./Dashboard/UserDashboard/QuizInstructions";
import QuizPage from "./Dashboard/UserDashboard/QuizPage";
import QuizResults from "./Dashboard/UserDashboard/QuizResults";
import NotFoundPage from "./Dashboard/UserDashboard/NotFoundPage";
import Quiz from "./DoQuiz/doquiz";
import QuizTaker from './TakeQuiz/QuizTaker';
import AuthWrapper from './components/AuthWrapper';
import { AuthProvider } from './context/AuthContext';
import UserDashboard from './Dashboard/UserDashboard/UserDashboard';
import QuizDashboard from './Dashboard/QuizDashboard/QuizDashboard';
import RoundCompletionDashboard from './Dashboard/RoundCompletionDashboard/RoundCompletionDashboard';
import Footer from './components/Footer';

const App = () => {
  const [user, setUser] = useState(null);
  const [quizLink, setQuizLink] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Header />
              <HeroSection />
              <FeaturesSection />
            </>
          } />
          <Route path="/about" element={<LoadingPage />} />
          <Route path="/adminlogin" element={<LoginContainer />} />
          <Route path="/studentlogin" element={<Container />} />
          {/* Protected Routes */}
          <Route path="/createquiz" element={
            <AuthWrapper>
              <InputDesign quizLink={quizLink} setQuizLink={setQuizLink} />
            </AuthWrapper>
          } />
          <Route path="/profile" element={
            <AuthWrapper>
              <AdminDashboard />
            </AuthWrapper>
          } />
          <Route path="/managequiz" element={
            <AuthWrapper>
              <Dashboard />
            </AuthWrapper>
          } />
          <Route path="/manageuser" element={
            <AuthWrapper>
              <UserManagementDashboard />
            </AuthWrapper>
          } />

          {/* Quiz Taking Routes */}
          <Route path="/quiz/:id" element={
            <AuthWrapper>
              <QuizTaker />
            </AuthWrapper>
          } />
          <Route path="/student" element={<QuizInstructions />} />
          <Route path="/student/quiz" element={<QuizPage />} />
          <Route path="/student/results" element={<QuizResults />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <AuthWrapper>
              <AdminDashboard />
            </AuthWrapper>
          } />

          {/* User Dashboard Route */}
          <Route path="/user-dashboard" element={
            <AuthWrapper>
              <UserDashboard />
            </AuthWrapper>
          } />

          {/* Quiz Dashboard Route */}
          <Route path="/quiz-dashboard" element={
            <AuthWrapper>
              <QuizDashboard />
            </AuthWrapper>
          } />

          {/* Round Completion Route */}
          <Route path="/round-complete" element={
            <AuthWrapper>
              <RoundCompletionDashboard />
            </AuthWrapper>
          } />

          {/* Catch-all Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
