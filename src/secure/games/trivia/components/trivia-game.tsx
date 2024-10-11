import { useContext } from "react";
import { TriviaContext } from "../state/trivia-context";
import Question from "./question";
import { Link } from "react-router-dom";
import { SECONDS_TO_ANSWER } from "../models/constants";

export default function TriviaGame() {
  const { questions, currentQuestionIndex, correctQuestions, startTime } =
    useContext(TriviaContext);

  return (
    <section className="flex flex-col gap-2 w-full">
      <section className="flex justify-between">
        <h2>
          <span>Correctas: {correctQuestions}</span>
        </h2>

        <Link to="/games" className="text-blue-500">
          Salir
        </Link>
      </section>

      <div
        className={`h-[10px] bg-blue-500 w-full rounded-md ${
          startTime ? "progress-bar" : ""
        }`}
        style={{
          animationDuration: `${SECONDS_TO_ANSWER}s`,
        }}
      ></div>

      <Question {...questions[currentQuestionIndex]} />

      <section className="flex justify-center">{`${
        currentQuestionIndex + 1
      } / ${questions.length}`}</section>
    </section>
  );
}
