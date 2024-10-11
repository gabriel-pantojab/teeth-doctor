import { createContext } from "react";
import { Point } from "../models/point";
import { Position } from "../utils/game";

export interface GridType {
  value: number;
  className: string;
}

export interface TeethCrushContextType {
  grid: GridType[][];
  // tipo de setState
  updateGrid: React.Dispatch<React.SetStateAction<GridType[][]>>;
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
