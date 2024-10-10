import { GridType } from "../state/teeth-crush-context";
import { Point } from "../models/point";
import {
  canCrush,
  crush,
  fallDownSquares,
  isValidMove,
  moveSquare,
  Position,
} from "../utils/game";
import {
  determineDirection,
  Direction,
  DirectionVector,
  oppositeDirection,
} from "../utils/utils";

interface Props {
  grid: GridType[][];
  updateGrid: (grid: GridType[][]) => void;
}

export function useTeethCrush({ grid, updateGrid }: Props) {
  const moveSquareAction = (
    point: Point,
    startPoint: Point,
    startPosition: Position
  ) => {
    const cloneGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const { x, y } = point;
    const direction: Direction = determineDirection(startPoint, {
      x,
      y,
    });

    const moveVector = DirectionVector[direction];
    const from = {
      row: startPosition.row,
      column: startPosition.column,
    };
    const to = {
      row: startPosition.row + moveVector.y,
      column: startPosition.column + moveVector.x,
    };

    if (isValidMove(to, cloneGrid)) {
      cloneGrid[from.row][from.column].className = `${direction}-movement`;
      cloneGrid[to.row][to.column].className = `${oppositeDirection(
        direction
      )}-movement`;

      updateGrid(cloneGrid);

      setTimeout(() => {
        cloneGrid[from.row][from.column].className = "";
        cloneGrid[to.row][to.column].className = "";
        const updatedGrid = moveSquare(from, to, cloneGrid);
        updateGrid(updatedGrid);

        if (canCrush(to, updatedGrid)) {
          updateGrid(crush(to, updatedGrid));
          let repeatCount = 0;
          const intervalID = setInterval(() => {
            if (repeatCount === 5) {
              clearInterval(intervalID);
              return;
            }
            updateGrid(fallDownSquares(updatedGrid));
            repeatCount++;
          }, 200);
        }
      }, 500);
    }
  };

  return {
    moveSquareAction,
  };
}
