import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";

const initialState = {
  questions: [],
  status: "loading",
  errorMessage: "",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "success":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return {
        ...state,
        status: "error",
        errorMessage: "Failed to fetch data",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [{ questions, status, errorMessage, index, answer, points }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, num) => acc + num.points, 0);

  useEffect(() => {
    function fetchData() {
      fetch("http://localhost:8000/questions")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => dispatch({ type: "success", payload: data }))
        .catch((err) => {
          console.error(err);
          dispatch({ type: "dataFailed" });
        });
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      {/* <DateCounter/> */}
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error errorMessage={errorMessage} />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
