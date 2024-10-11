import { COUNT_IMAGES, COUNT_TO_CRUSH } from "../models/constants";
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

function countMatch(
  position: Position,
  dr: number,
  dc: number,
  grid: GridType[][]
) {
  let r = position.row,
    c = position.column;

  let match = 0;

  while (
    r >= 0 &&
    r < grid.length &&
    c >= 0 &&
    c < grid[0].length &&
    grid[r][c].value === grid[position.row][position.column].value
  ) {
    match++;
    r += dr;
    c += dc;
  }

  return match;
}

export function canCrush(position: Position, grid: GridType[][]) {
  let canCrushHorizontal = false;
  let canCrushVertical = false;

  let matchHorizontal = 0;
  let matchVertical = 0;

  matchHorizontal += countMatch(position, 0, 1, grid);
  matchHorizontal += countMatch(position, 0, -1, grid);
  matchHorizontal -= 1;

  matchVertical += countMatch(position, 1, 0, grid);
  matchVertical += countMatch(position, -1, 0, grid);
  matchVertical -= 1;

  canCrushHorizontal = matchHorizontal >= COUNT_TO_CRUSH;
  canCrushVertical = matchVertical >= COUNT_TO_CRUSH;

  return canCrushHorizontal || canCrushVertical;
}

export function canCrushAll(grid: GridType[][]) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (canCrush({ row: i, column: j }, grid)) {
        return true;
      }
    }
  }

  return false;
}

function horizontalCrush(
  r: number,
  c: number,
  grid: GridType[][],
  value: number
) {
  const updatedGrid = grid.map((row) => row.slice());
  let left = c,
    right = c + 1;

  while (left >= 0 && updatedGrid[r][left].value === value) {
    updatedGrid[r][left].value = 0;
    left--;
  }

  while (
    right < updatedGrid[0].length &&
    updatedGrid[r][right].value === value
  ) {
    updatedGrid[r][right].value = 0;
    right++;
  }

  return updatedGrid;
}

function verticalCrush(
  r: number,
  c: number,
  grid: GridType[][],
  value: number
) {
  const updatedGrid = grid.map((row) => row.slice());
  let top = r,
    bottom = r + 1;

  while (top >= 0 && updatedGrid[top][c].value === value) {
    updatedGrid[top][c].value = 0;
    top--;
  }

  while (
    bottom < updatedGrid.length &&
    updatedGrid[bottom][c].value === value
  ) {
    updatedGrid[bottom][c].value = 0;
    bottom++;
  }

  return updatedGrid;
}

export function crush(position: Position, grid: GridType[][]): GridType[][] {
  const cloneGrid = grid.map((row) => row.slice());
  const value = cloneGrid[position.row][position.column].value;

  const r = position.row;
  const c = position.column;

  //todo: primero verificar L / T
  let updatedGrid;
  const canCrushHorizontal =
    countMatch(position, 0, 1, cloneGrid) +
      countMatch(position, 0, -1, cloneGrid) -
      1 >=
    COUNT_TO_CRUSH;
  const canCrushVertical =
    countMatch(position, 1, 0, cloneGrid) +
      countMatch(position, -1, 0, cloneGrid) -
      1 >=
    COUNT_TO_CRUSH;

  if (canCrushHorizontal) {
    updatedGrid = horizontalCrush(r, c, cloneGrid, value);
  } else if (canCrushVertical) {
    updatedGrid = verticalCrush(r, c, cloneGrid, value);
  }

  return updatedGrid || cloneGrid;
}

export function crushAll(grid: GridType[][]): GridType[][] {
  let updatedGrid = grid.map((row) => row.slice());

  for (let i = 0; i < updatedGrid.length; i++) {
    for (let j = 0; j < updatedGrid[0].length; j++) {
      if (canCrush({ row: i, column: j }, updatedGrid)) {
        updatedGrid = crush({ row: i, column: j }, updatedGrid);
      }
    }
  }

  return updatedGrid;
}

export function fallDownSquares(grid: GridType[][]) {
  const updatedGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
  for (let i = updatedGrid.length - 1; i >= 0; i--) {
    for (let j = 0; j < updatedGrid[0].length; j++) {
      if (updatedGrid[i][j].value !== 0) {
        let k = i + 1;
        while (k < updatedGrid.length && updatedGrid[k][j].value === 0) {
          k++;
        }

        if (k !== i + 1) {
          updatedGrid[k - 1][j].value = updatedGrid[i][j].value;
          updatedGrid[i][j].value = 0;
        }
      }
    }
  }

  return updatedGrid;
}

export function fillEmptySquares(grid: GridType[][]) {
  const updatedGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

  for (let i = 0; i < updatedGrid.length; i++) {
    for (let j = 0; j < updatedGrid[0].length; j++) {
      if (updatedGrid[i][j].value === 0) {
        updatedGrid[i][j].value = Math.floor(Math.random() * COUNT_IMAGES) + 1;
      }
    }
  }

  return updatedGrid;
}
