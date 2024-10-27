import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import Quiz from "./components/Quiz";
import Learn from "./components/Learn";
import Results from "./components/Results";
import History from "./components/History";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <QuizProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Quiz />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/results" element={<Results />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QuizProvider>
  );
};

export default App;
