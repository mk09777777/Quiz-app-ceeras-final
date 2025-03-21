import { useEffect, useState } from "react";
import { db } from "../firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "quiz"));

        if (!querySnapshot.empty) {
          const firstDoc = querySnapshot.docs[0];
          const quizData = { id: firstDoc.id, ...firstDoc.data() };
          console.log("Fetched quiz:", quizData);
          setQuiz(quizData);
          
          // Initialize timer - assuming 1 hour for the quiz
          const totalSeconds = 60 * 60; // 1 hour
          setTimeLeft(totalSeconds);
        } else {
          console.log("No quiz found in Firestore.");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  // Timer effect
  useEffect(() => {
    if (!timeLeft || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    if (!seconds) return "00:00";
    
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (questionIndex, optionValue) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionIndex]: optionValue
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.details.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const toggleMarkForReview = (questionIndex) => {
    setMarkedForReview(prev => {
      if (prev.includes(questionIndex)) {
        return prev.filter(q => q !== questionIndex);
      } else {
        return [...prev, questionIndex];
      }
    });
  };

  const goToQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const handleSubmitQuiz = () => {
    // Add logic to submit the quiz
    alert("Quiz submitted!");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl text-gray-700">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-500">Quiz Not Found</h2>
          <p className="mt-2 text-gray-600">No quiz data available. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with title and timer */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{quiz.details.title || "Mathematics Quiz"}</h1>
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold">{formatTime(timeLeft)}</div>
            <button 
              onClick={handleSubmitQuiz}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded"
            >
              Submit Quiz
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Main quiz content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg">
                Question {currentQuestion + 1} of {quiz.details.questions.length}
                {markedForReview.includes(currentQuestion) && (
                  <span className="ml-2 text-blue-500">(Marked for review)</span>
                )}
              </div>
              <button
                onClick={() => toggleMarkForReview(currentQuestion)}
                className="text-blue-500 hover:text-blue-700 text-sm py-1 px-3 border border-blue-500 rounded"
              >
                Mark for review
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-6">
                {quiz.details.questions[currentQuestion]?.text || "What is the value of x in the equation: 2x + 5 = 15?"}
              </h2>
              
              <div className="space-y-4">
                {(quiz.details.questions[currentQuestion]?.options || [
                  { id: "option1", text: "x = 5" },
                  { id: "option2", text: "x = 10" },
                  { id: "option3", text: "x = 7" },
                  { id: "option4", text: "x = 8" }
                ]).map((option) => (
                  <div 
                    key={option.id}
                    className="border rounded-lg p-4"
                  >
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        checked={selectedOptions[currentQuestion] === option.id}
                        onChange={() => handleOptionSelect(currentQuestion, option.id)}
                        className="mr-3 h-5 w-5 text-teal-500"
                      />
                      <span>{option.text}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                className="border border-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-50"
                disabled={currentQuestion === 0}
              >
                ← Previous
              </button>
              <button
                onClick={handleNextQuestion}
                className="bg-teal-500 text-white py-2 px-10 rounded hover:bg-teal-600"
                disabled={currentQuestion === quiz.details.questions.length - 1}
              >
                Next
              </button>
            </div>
          </div>
          
          {/* Question overview sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Question Overview</h2>
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: quiz.details.questions.length || 20 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToQuestion(i)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center 
                    ${currentQuestion === i ? 'bg-teal-500 text-white' : 
                      selectedOptions[i] ? 'bg-gray-200' : 'bg-gray-100'} 
                    ${markedForReview.includes(i) ? 'ring-2 ring-blue-400' : ''}
                    hover:bg-gray-200`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;