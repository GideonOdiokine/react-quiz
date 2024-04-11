import React from "react";

const StartScreen = ({ numQuestions, dispatch }) => {

  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <div>{numQuestions} questions to test your React mastery</div>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
