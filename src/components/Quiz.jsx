import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const Quiz = () => {
  const { currentQuestion, questions, submitAnswer, userAnswers, finishQuiz } =
    useQuiz();
  const [timeLeft, setTimeLeft] = useState(40);
  const [randomizedOptions, setRandomizedOptions] = useState([]);
  const [hasAnswered, setHasAnswered] = useState(false);
  const navigate = useNavigate();

  // Function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Randomize options and reset selection when question changes
  useEffect(() => {
    if (questions[currentQuestion]) {
      setRandomizedOptions(shuffleArray(questions[currentQuestion].options));
      setHasAnswered(false); // Reset the answered state for new question
    }
  }, [currentQuestion, questions]);

  useEffect(() => {
    if (userAnswers.length === questions.length) {
      finishQuiz();
      navigate("/results");
      return;
    }

    setTimeLeft(40);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 40;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, userAnswers.length, questions.length]);

  const handleTimeUp = () => {
    if (!hasAnswered) {
      submitAnswer(null);
      if (userAnswers.length + 1 === questions.length) {
        finishQuiz();
        navigate("/results");
      }
    }
  };

  const handleAnswerSubmit = (answer) => {
    if (!hasAnswered) {
      setHasAnswered(true);
      submitAnswer(answer);
      if (userAnswers.length + 1 === questions.length) {
        finishQuiz();
        navigate("/results");
      }
    }
  };

  if (userAnswers.length === questions.length) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Quiz Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6 mb-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center bg-blue-600 text-white text-lg font-semibold h-10 w-10 rounded-full">
                {currentQuestion + 1}
              </span>
              <span className="text-gray-500 font-medium">
                of {questions.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full border-4 border-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">{timeLeft}s</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 40) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {randomizedOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSubmit(option)}
                disabled={hasAnswered}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-200 
                         hover:border-blue-500 hover:bg-blue-50 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         group relative disabled:opacity-75 disabled:hover:border-gray-200 disabled:hover:bg-white"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 
                                group-hover:bg-blue-100 flex items-center justify-center
                                text-gray-500 group-hover:text-blue-600 font-medium
                                transition-colors duration-200"
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg text-gray-700 group-hover:text-blue-700">
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
