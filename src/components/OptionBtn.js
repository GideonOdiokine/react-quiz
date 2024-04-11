import React from "react";

const OptionBtn = ({ option, dispatch, answer, index, question }) => {
  const hasAnswered = answer !== null;
  return (
    <button
      onClick={() => dispatch({ type: "newAnswer", payload: index })}
      disabled={hasAnswered}
      className={`btn btn-option ${index === answer ? "answer" : ""} ${
        hasAnswered
          ? index === question.correctOption
            ? "correct"
            : "wrong"
          : ""
      }`}
    >
      {option}
    </button>
  );
};

export default OptionBtn;
