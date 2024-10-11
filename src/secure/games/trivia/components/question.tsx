import { useContext, useEffect, useState } from "react";

import { getRandomColors } from "../utils/utils";
import { TriviaContext } from "../state/trivia-context";
import { SECONDS_TO_ANSWER } from "../models/constants";

interface QuestionProps {
  question: string;
  answers: string[];
}

export default function Question({ question, answers }: QuestionProps) {
  const { handleAnswer, setStartTime, setTimeLimit } =
    useContext(TriviaContext);
  const [randomColors, setRandomColors] = useState<string[]>(
    getRandomColors(answers.length)
  );

  useEffect(() => {
    setStartTime(true);
    setTimeLimit(false);

    const ID = setTimeout(() => {
      setStartTime(false);
      setTimeLimit(true);
    }, SECONDS_TO_ANSWER * 1000);

    return () => clearTimeout(ID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  useEffect(() => {
    setRandomColors(getRandomColors(answers.length));
  }, [answers]);

  const handleClick = (index: number) => {
    setStartTime(false);
    setTimeLimit(false);
    handleAnswer(index);
  };

  return (
    <article className="shadow-lg flex flex-col gap-2 bg-white rounded-md p-4  items-center justify-center">
      <section>
        <h2 className="text-2xl text-center">{question}</h2>
      </section>

      <section className="flex flex-col gap-2 w-full">
        {answers.map((answer, index) => (
          <button
            onClick={() => handleClick(index)}
            key={index}
            disabled={false}
            style={{ backgroundColor: randomColors[index] }}
            className={`p-2 text-xl font-bold text-white rounded-md w-full min-h-[70px]`}
          >
            {answer}
          </button>
        ))}
      </section>
    </article>
  );
}
