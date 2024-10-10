import { useState } from "react";
import { Grid } from "./components/grid";
import { GridType, TeethCrushContext } from "./state/teeth-crush-context";
import { generateGrid } from "./utils/utils";
import { useTeethCrush } from "./hooks/use-teeth-crush";

export function TeethCrush() {
  const [grid, setGrid] = useState<GridType[][]>(generateGrid(5, 5));
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
