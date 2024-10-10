import { GridType } from "../state/teeth-crush-context";

export interface Position {
  row: number;
  column: number;
}

export function isValidMove(position: Position, grid: GridType[][]): boolean {
  const { column, row } = position;
  return (
    column >= 0 && column < grid[0].length && row >= 0 && row < grid.length
  );
}

export function moveSquare(
  from: Position,
  to: Position,
  grid: GridType[][]
): GridType[][] {
  const updatedGrid = grid.map((row) => row.slice());
  const temp = updatedGrid[from.row][from.column];
  updatedGrid[from.row][from.column] = updatedGrid[to.row][to.column];
  updatedGrid[to.row][to.column] = temp;
  return updatedGrid;
}
