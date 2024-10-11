import { useState } from "react";
import { Grid } from "./components/grid";
import { GridType, TeethCrushContext } from "./state/teeth-crush-context";
import { generateGrid } from "./utils/utils";
import { useTeethCrush } from "./hooks/use-teeth-crush";
import { GRID_COLUMNS, GRID_ROWS } from "./models/constants";

export function TeethCrush() {
  const [grid, setGrid] = useState<GridType[][]>(
    generateGrid(GRID_ROWS, GRID_COLUMNS)
  );
  const { moveSquareAction } = useTeethCrush({ grid, updateGrid: setGrid });

  return (
    <TeethCrushContext.Provider
      value={{
        grid,
        updateGrid: setGrid,
        moveSquareAction,
      }}
    >
      <section className="w-full h-full flex flex-col justify-center items-center">
        <Grid />
      </section>
    </TeethCrushContext.Provider>
  );
}
