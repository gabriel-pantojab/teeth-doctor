import { useState } from "react";
import { Grid } from "./components/grid";
import { GridType, TeethCrushContext } from "./state/teeth-crush-context";

export function TeethCrush() {
  const [grid, setGrid] = useState<GridType[][]>([
    [
      { value: 1, className: "" },
      { value: 2, className: "" },
      { value: 3, className: "" },
    ],
    [
      { value: 4, className: "" },
      { value: 5, className: "" },
      { value: 6, className: "" },
    ],
    [
      { value: 7, className: "" },
      { value: 8, className: "" },
      { value: 9, className: "" },
    ],
  ]);

  return (
    <TeethCrushContext.Provider
      value={{
        grid,
        updateGrid: (grid) => {
          setGrid(grid);
        },
      }}
    >
      <section className="w-full h-full flex flex-col justify-center items-center">
        <Grid />
      </section>
    </TeethCrushContext.Provider>
  );
}
