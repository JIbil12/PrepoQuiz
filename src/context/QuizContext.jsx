import React, { createContext, useState, useContext } from "react";
import { questions } from "../data/questions";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [errors, setErrors] = useState([]);

  const submitAnswer = (answer) => {
    const currentQ = questions[currentQuestion];
    const isCorrect = answer === currentQ.correctAnswer;
    const newScore = score + (isCorrect ? 4 : -1);

    setScore(newScore);
    setUserAnswers([
      ...userAnswers,
      {
        question: currentQ.question,
        userAnswer: answer,
        correctAnswer: currentQ.correctAnswer,
        isCorrect,
      },
    ]);

    if (!isCorrect) {
      setErrors([
        ...errors,
        {
          question: currentQ.question,
          explanation: currentQ.explanation,
        },
      ]);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const finishQuiz = () => {
    const newHistory = {
      date: new Date().toLocaleDateString(),
      score,
      errors,
      totalQuestions: questions.length,
    };
    setQuizHistory([...quizHistory, newHistory]);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setErrors([]);
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        score,
        userAnswers,
        quizHistory,
        errors,
        questions,
        submitAnswer,
        resetQuiz,
        finishQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
