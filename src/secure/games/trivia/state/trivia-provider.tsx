import { useCallback, useContext, useEffect, useState } from "react";

import { TriviaContext } from "@/secure/games/trivia/state/trivia-context";
import { AppContext } from "@/secure/state/app-context";

import { QuestionModel } from "@/secure/games/trivia/models/question";
import {
  endTriviaPopup,
  showPopupMessage,
} from "@/secure/games/trivia/utils/popup-message";
import {
  COUNT_QUESTIONS,
  MAXIMUN_CORRECT_ANSWERS,
} from "@/secure/games/trivia/models/constants";
import { getRandomQuestions } from "@/secure/games/trivia/utils/utils";
import { QUESTIONS } from "@/secure/games/trivia/db/db";
import { updateLivesStorage } from "@/storage/storage";

export function TriviaProvider({ children }: { children: React.ReactNode }) {
  const { updateLives } = useContext(AppContext);
  const [questions, setQuestions] = useState<QuestionModel[]>(
    getRandomQuestions(QUESTIONS, COUNT_QUESTIONS)
  );
  const [currentQuestionIndex, setCurrentQuestion] = useState<number>(0);
  const [correctQuestions, setCorrectQuestions] = useState<number>(0);
  const [startTime, setStartTime] = useState<boolean>(false);
  const [timeLimit, setTimeLimit] = useState<boolean>(false);
  const [run, setRun] = useState<boolean>(false);

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

            endTriviaPopup(correctQuestions).then(() => resetTrivia());
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLimit]);

  const resetTrivia = () => {
    setQuestions(getRandomQuestions(QUESTIONS, COUNT_QUESTIONS));
    setCurrentQuestion(0);
    setCorrectQuestions(0);
    setStartTime(false);
    setTimeLimit(false);
    setRun(false);
  };

  const endTrivia = (correctQuestionNumber: number) => {
    if (correctQuestionNumber > MAXIMUN_CORRECT_ANSWERS) {
      updateLives((prev) => {
        updateLivesStorage(prev + 1);
        return prev + 1;
      });
    }
    endTriviaPopup(correctQuestions).then(() => resetTrivia());
  };

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
              endTrivia(prev);
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
              endTrivia(correctQuestions);
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
        run,
        setRun,
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
