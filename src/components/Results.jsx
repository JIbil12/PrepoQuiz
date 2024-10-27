import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const Results = () => {
  const { score, errors, userAnswers, resetQuiz } = useQuiz();
  const navigate = useNavigate();

  const handleRetry = () => {
    resetQuiz();
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Quiz Results</h2>

      <div className="mb-8">
        <p className="text-xl">
          Final Score: {score} / {userAnswers.length * 4}
        </p>
        <p className="text-gray-600">
          Correct Answers: {userAnswers.filter((a) => a.isCorrect).length}
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Areas to Improve</h3>
          {errors.map((error, index) => (
            <div key={index} className="mb-4 p-4 bg-red-50 rounded-lg">
              <p className="font-medium">{error.question}</p>
              <p className="text-gray-600">{error.explanation}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleRetry}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
        <button
          onClick={() => navigate("/history")}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          View History
        </button>
      </div>
    </div>
  );
};

export default Results;
