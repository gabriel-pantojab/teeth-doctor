import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TriviaContext } from "./trivia-context";

import { QuestionModel } from "../models/question";
import { endTriviaPopup, showPopupMessage } from "../utils/popup-message";
import { AppContext } from "@/secure/state/app-context";
import { MAXIMUN_CORRECT_ANSWERS } from "../models/constants";

export function TriviaProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { updateLives } = useContext(AppContext);
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
          if (!nextQuestion()) {
            if (correctQuestions > MAXIMUN_CORRECT_ANSWERS) {
              updateLives((prev) => prev + 1);
            }

            endTriviaPopup(correctQuestions).then(() => navigate("/games"));
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLimit]);

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
      return true;
    }
    return false;
  }, [questions, currentQuestionIndex]);

  const handleAnswer = (index: number) => {
    const temp = structuredClone(questions);
    const answered = temp[currentQuestionIndex].answered;
    if (answered) return;
    if (index === questions[currentQuestionIndex].indexCorrectAnswer) {
      setCorrectQuestions((prev) => {
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
            if (!nextQuestion()) {
              if (prev + 1 > MAXIMUN_CORRECT_ANSWERS) {
                updateLives((prev) => prev + 1);
              }
              endTriviaPopup(prev + 1).then(() => navigate("/games"));
            }
          }
        });
        return prev + 1;
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
            if (!nextQuestion()) {
              if (correctQuestions > MAXIMUN_CORRECT_ANSWERS) {
                updateLives((prev) => prev + 1);
              }
              endTriviaPopup(correctQuestions).then(() => navigate("/games"));
            }
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
