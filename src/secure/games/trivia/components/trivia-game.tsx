import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { TriviaContext } from "../state/trivia-context";
import Question from "./question";

import { SECONDS_TO_ANSWER } from "../models/constants";
import Play from "@/secure/components/icons/play";

const triviaMusic = new Audio("/src/assets/music/trivia.mp3");

export default function TriviaGame() {
  const {
    questions,
    currentQuestionIndex,
    correctQuestions,
    startTime,
    run,
    setRun,
  } = useContext(TriviaContext);

  useEffect(() => {
    return () => {
      triviaMusic.pause();
      triviaMusic.currentTime = 0;
    };
  }, []);

  const handleRun = () => {
    triviaMusic.play();
    triviaMusic.loop = true;
    setRun(true);
  };

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

      {!run && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center bg-white p-2 rounded-md">
            <button
              className="bg-blue-500 text-white border-2 border-white rounded-full p-4"
              onClick={handleRun}
            >
              <Play color="white" height={50} width={50} />
            </button>

            <Link to="/games">Volver</Link>
          </div>
        </div>
      )}
    </section>
  );
}
