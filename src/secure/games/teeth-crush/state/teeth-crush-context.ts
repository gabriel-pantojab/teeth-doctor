import { createContext } from "react";
import { Point } from "../models/point";
import { Position } from "../utils/game";

export interface GridType {
  value: number;
  className: string;
}

export interface TeethCrushContextType {
  grid: GridType[][];
  updateGrid: React.Dispatch<React.SetStateAction<GridType[][]>>;
  moveSquareAction: (
    point: Point,
    startPoint: Point,
    startPosition: Position
  ) => void;
  score: number;
  updateScore?: React.Dispatch<React.SetStateAction<number>>;
  timerDuration?: number;
  updateTimerDuration?: React.Dispatch<React.SetStateAction<number>>;
}

export const TeethCrushContext = createContext<TeethCrushContextType>({
  grid: [],
  updateGrid: () => {},
  moveSquareAction: () => {},
  score: 0,
  updateScore: () => {},
  timerDuration: 0,
  updateTimerDuration: () => {},
});
