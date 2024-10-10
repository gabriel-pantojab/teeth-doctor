import { createContext } from "react";
import { Point } from "../models/point";
import { Position } from "../utils/game";

export interface GridType {
  value: number;
  className: string;
}

export interface TeethCrushContextType {
  grid: GridType[][];
  updateGrid: (grid: GridType[][]) => void;
  moveSquareAction: (
    point: Point,
    startPoint: Point,
    startPosition: Position
  ) => void;
}

export const TeethCrushContext = createContext<TeethCrushContextType>({
  grid: [],
  updateGrid: () => {},
  moveSquareAction: () => {},
});
