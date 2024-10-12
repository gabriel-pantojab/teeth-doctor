import { useState, createContext, useEffect } from "react";

import { GRID_COLUMNS, GRID_ROWS } from "../models/constants";
import { generateGrid } from "../utils/utils";
import { GridType, TeethCrushContextType } from "./teeth-crush-context";
import { useTeethCrush } from "../hooks/use-teeth-crush";
import { checkCanMove } from "../utils/game";

export const TeethCrushContext = createContext<TeethCrushContextType>({
  grid: [],
  updateGrid: () => {},
  moveSquareAction: () => {},
  score: 0,
  updateScore: () => {},
  timerDuration: 0,
  updateTimerDuration: () => {},
});

export function TeethCrushProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [grid, setGrid] = useState<GridType[][]>(
    generateGrid(GRID_ROWS, GRID_COLUMNS)
  );
  const [score, setScore] = useState<number>(0);
  const [timerDuration, setTimerDuration] = useState<number>(120);
  const { moveSquareAction } = useTeethCrush({
    grid,
    updateGrid: setGrid,
    updateScore: setScore,
  });

  useEffect(() => {
    if (!checkCanMove(grid)) {
      setGrid(generateGrid(GRID_ROWS, GRID_COLUMNS));
    }
  }, [grid]);

  return (
    <TeethCrushContext.Provider
      value={{
        grid,
        updateGrid: setGrid,
        moveSquareAction,
        score,
        updateScore: setScore,
        timerDuration,
        updateTimerDuration: setTimerDuration,
      }}
    >
      {children}
    </TeethCrushContext.Provider>
  );
}
