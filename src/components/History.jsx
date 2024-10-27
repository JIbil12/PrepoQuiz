import React from "react";
import { useQuiz } from "../context/QuizContext";

const History = () => {
  const { quizHistory } = useQuiz();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Quiz History</h2>

      {quizHistory.length === 0 ? (
        <p className="text-gray-600">No quiz history available yet.</p>
      ) : (
        <div className="space-y-4">
          {quizHistory.map((record, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{record.date}</span>
                <span className="text-blue-600">
                  Score: {record.score} / {record.totalQuestions * 4}
                </span>
              </div>
              {record.errors.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium text-red-600 mb-2">
                    Errors ({record.errors.length}):
                  </p>
                  <ul className="list-disc pl-6 text-gray-600">
                    {record.errors.map((error, i) => (
                      <li key={i}>{error.question}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
