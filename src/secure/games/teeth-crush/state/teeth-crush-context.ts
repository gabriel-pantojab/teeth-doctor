import { createContext } from "react";

export interface GridType {
  value: number;
  className: string;
}

export interface TeethCrushContextType {
  grid: GridType[][];
  updateGrid: (grid: GridType[][]) => void;
}

export const TeethCrushContext = createContext<TeethCrushContextType>({
  grid: [],
  updateGrid: () => {},
});
