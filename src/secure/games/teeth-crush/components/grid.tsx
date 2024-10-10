import { useContext } from "react";
import { Square } from "./square";
import { TeethCrushContext } from "../state/teeth-crush-context";
import { Position } from "../utils/game";

export function Grid() {
  const { grid, updateGrid } = useContext(TeethCrushContext);
  const rows = grid.length;
  const columns = grid[0].length;

  const addAnimateToSquare = (position: Position, className: string) => {
    const newGrid = [...grid];
    newGrid[position.row][position.column].className = `${className}-movement`;
    updateGrid(newGrid);
  };

  const removeAnimateFromSquare = (position: Position) => {
    const newGrid = [...grid];
    newGrid[position.row][position.column].className = "";
    updateGrid(newGrid);
  };

  return (
    <div
      className="grid gap-[3px] m-auto"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((_, columnIndex) => (
          <Square
            key={`${rowIndex}-${columnIndex}`}
            position={{
              row: rowIndex,
              column: columnIndex,
            }}
            className={grid[rowIndex][columnIndex].className}
            addAnimateToSquare={addAnimateToSquare}
            removeAnimateFromSquare={removeAnimateFromSquare}
          >
            {grid[rowIndex][columnIndex].value}
          </Square>
        ))
      )}
    </div>
  );
}
