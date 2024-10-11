import { useCallback, useEffect, useState } from "react";

import { TriviaContext } from "./trivia-context";

import { QuestionModel } from "../models/question";
import { showPopupMessage } from "../utils/popup-message";

export function TriviaProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<QuestionModel[]>([
    {
      question: "¿Cuál es la capital de Francia?",
      answers: ["Madrid", "Paris", "Londres", "Roma"],
      indexCorrectAnswer: 1,
      answered: false,
    },
    {
      question: "¿Cuál es la capital de España?",
      answers: ["Madrid", "Paris", "Londres", "Roma"],
      indexCorrectAnswer: 0,
      answered: false,
    },
    {
      question: "¿Cuál es la capital de Italia?",
      answers: ["Madrid", "Paris", "Londres", "Roma"],
      indexCorrectAnswer: 3,
      answered: false,
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestion] = useState<number>(0);
  const [correctQuestions, setCorrectQuestions] = useState<number>(0);
  const [startTime, setStartTime] = useState<boolean>(true);
  const [timeLimit, setTimeLimit] = useState<boolean>(false);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setQuestions((prev) =>
        prev.map((question, index) =>
          index === currentQuestionIndex
            ? { ...question, answered: true }
            : question
        )
      );
      setCurrentQuestion(currentQuestionIndex + 1);
    }
  }, [questions, currentQuestionIndex]);

  useEffect(() => {
    if (timeLimit) {
      showPopupMessage({
        icon: "error",
        title: "Tiempo agotado",
        text: "Se acabó el tiempo",
        confirmButtonText:
          currentQuestionIndex === questions.length - 1
            ? "Finalizar"
            : "Siguiente",
      }).then((result) => {
        if (result.isConfirmed) {
          nextQuestion();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLimit]);

  const handleAnswer = (index: number) => {
    const temp = structuredClone(questions);
    const answered = temp[currentQuestionIndex].answered;
    if (answered) return;
    if (index === questions[currentQuestionIndex].indexCorrectAnswer) {
      setCorrectQuestions(correctQuestions + 1);
      showPopupMessage({
        icon: "success",
        title: "Correcto",
        text: "Respuesta correcta",
        confirmButtonText:
          currentQuestionIndex === questions.length - 1
            ? "Finalizar"
            : "Siguiente",
      }).then((result) => {
        if (result.isConfirmed) {
          nextQuestion();
        }
      });
    } else {
      if (index !== questions[currentQuestionIndex].indexCorrectAnswer) {
        showPopupMessage({
          icon: "error",
          title: "Incorrecto",
          text: "Respuesta incorrecta",
          confirmButtonText:
            currentQuestionIndex === questions.length - 1
              ? "Finalizar"
              : "Siguiente",
        }).then((result) => {
          if (result.isConfirmed) {
            nextQuestion();
          }
        });
      }
    }
    temp[currentQuestionIndex].answered = true;
    setQuestions(temp);
  };

  return (
    <TriviaContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        correctQuestions,
        startTime,
        timeLimit,
        setTimeLimit,
        setQuestions,
        updateCorrectQuestions: setCorrectQuestions,
        nextQuestion,
        handleAnswer,
        setStartTime,
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
}
