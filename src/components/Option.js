import React from "react";
import OptionBtn from "./OptionBtn";

const Option = ({ question, dispatch, answer }) => {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <OptionBtn
          index={index}
          answer={answer}
          option={option}
          dispatch={dispatch}
          key={option}
          question={question}
        />
      ))}
    </div>
  );
};

export default Option;
