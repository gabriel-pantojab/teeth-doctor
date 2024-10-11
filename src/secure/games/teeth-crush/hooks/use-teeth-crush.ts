import { GridType } from "../state/teeth-crush-context";
import { Point } from "../models/point";
import {
  canCrushAll,
  crushAll,
  fallDownSquares,
  fillEmptySquares,
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
  updateGrid: React.Dispatch<React.SetStateAction<GridType[][]>>;
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

      updateGrid(cloneGrid); // hemos movido el cuadrado solo visualmente

      setTimeout(() => {
        const cloneGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
        cloneGrid[from.row][from.column].className = "";
        cloneGrid[to.row][to.column].className = "";
        const updatedGrid = moveSquare(from, to, cloneGrid);
        updateGrid(updatedGrid);

        if (canCrushAll(updatedGrid)) {
          const temp = crushAll(updatedGrid);
          updateGrid(temp);
          setTimeout(() => {
            updateGrid((prev) => {
              const temp = fallDownSquares(prev);
              return temp;
            });
          }, 500);
          setTimeout(() => {
            updateGrid((prev) => {
              const temp = fillEmptySquares(prev);
              return temp;
            });
          }, 1000);
        } else {
          const temp = moveSquare(to, from, updatedGrid);
          updateGrid(temp);
        }
      }, 500);
    }
  };

  return {
    moveSquareAction,
  };
}
