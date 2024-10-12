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

import crushMp3 from "/assets/sounds/crush.mp3";
import { POINTS_PER_SQUARE } from "../models/constants";

interface Props {
  grid: GridType[][];
  updateGrid: React.Dispatch<React.SetStateAction<GridType[][]>>;
  updateScore: React.Dispatch<React.SetStateAction<number>>;
}

const crushAudio = new Audio(crushMp3);

export function useTeethCrush({ grid, updateGrid, updateScore }: Props) {
  const crush = () => {
    updateGrid((prev) => {
      const updatedGrid = prev.map((row) => row.map((cell) => ({ ...cell })));
      if (canCrushAll(prev)) {
        crushAudio.play();
        const [g, e] = crushAll(updatedGrid);

        updateScore((prev) => {
          return prev + e.length * POINTS_PER_SQUARE;
        });

        for (const position of e) {
          updatedGrid[position.row][position.column].className = "fade-out";
        }

        setTimeout(() => {
          const temp1 = fallDownSquares(g);
          const temp = fillEmptySquares(temp1);
          for (const position of e) {
            temp[position.row][position.column].className = "";
          }
          setTimeout(() => {
            crush();
          }, 300);
          updateGrid(temp);
        }, 500);
      }
      return updatedGrid;
    });
  };

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
        const cloneGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
        cloneGrid[from.row][from.column].className = "";
        cloneGrid[to.row][to.column].className = "";
        const updatedGrid = moveSquare(from, to, cloneGrid);
        updateGrid(updatedGrid);
        if (canCrushAll(updatedGrid)) {
          crush();
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
