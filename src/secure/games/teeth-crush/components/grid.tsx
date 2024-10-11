import { useContext } from "react";
import { Square } from "./square";
import { TeethCrushContext } from "../state/teeth-crush-context";

export function Grid() {
  const { grid } = useContext(TeethCrushContext);
  const rows = grid.length;
  const columns = grid[0].length;

  return (
    <div
      className="grid gap-[3px] m-auto"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((_, columnIndex) =>
          grid[rowIndex][columnIndex].value ? (
            <Square
              key={`${rowIndex}-${columnIndex}`}
              position={{
                row: rowIndex,
                column: columnIndex,
              }}
              className={grid[rowIndex][columnIndex].className}
              value={grid[rowIndex][columnIndex].value}
            />
          ) : (
            <div></div>
          )
        )
      )}
    </div>
  );
}
