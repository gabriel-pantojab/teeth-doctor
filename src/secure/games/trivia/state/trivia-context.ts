import { createContext } from "react";
import { QuestionModel } from "../models/question";

export interface TriviaContextType {
  questions: QuestionModel[];
  currentQuestionIndex: number;
  correctQuestions: number;
  startTime: boolean;
  timeLimit: boolean;
  setTimeLimit: React.Dispatch<React.SetStateAction<boolean>>;
  setStartTime: React.Dispatch<React.SetStateAction<boolean>>;
  setQuestions: React.Dispatch<React.SetStateAction<QuestionModel[]>>;
  updateCorrectQuestions: React.Dispatch<React.SetStateAction<number>>;
  nextQuestion: () => void;
  handleAnswer: (index: number) => void;
}

export const TriviaContext = createContext<TriviaContextType>({
  questions: [],
  currentQuestionIndex: 0,
  correctQuestions: 0,
  startTime: false,
  timeLimit: false,
  setTimeLimit: () => {},
  setStartTime: () => {},
  setQuestions: () => {},
  updateCorrectQuestions: () => {},
  nextQuestion: () => {},
  handleAnswer: () => {},
});
