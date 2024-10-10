import { TouchEvent, useContext, useState } from "react";
import {
  determineDirection,
  Direction,
  DirectionVector,
  oppositeDirection,
} from "../utils/utils";
import { Point } from "../models/point";
import { isValidMove, moveSquare, Position } from "../utils/game";
import { TeethCrushContext } from "../state/teeth-crush-context";
import { HEIGHT, WIDTH } from "../models/constants";

interface SquareProps {
  children: React.ReactNode;
  position: Position;
  className?: string;
  addAnimateToSquare?: (position: Position, className: string) => void;
  removeAnimateFromSquare?: (position: Position) => void;
}

export function Square({
  children,
  position,
  className,
  addAnimateToSquare,
  removeAnimateFromSquare
}: SquareProps) {
  const { grid, updateGrid } = useContext(TeethCrushContext);
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [animateClass, setAnimateClass] = useState<string>("");

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const { clientX, clientY } = touch;

    setStartPoint({ x: clientX, y: clientY });
    setIsMoving(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();

    if (!isMoving) return;

    const touch = e.touches[0];
    const { clientX, clientY } = touch;

    const direction: Direction = determineDirection(startPoint, {
      x: clientX,
      y: clientY,
    });

    const moveVector = DirectionVector[direction];
    const from = {
      row: position.row,
      column: position.column,
    };
    const to = {
      row: position.row + moveVector.y,
      column: position.column + moveVector.x,
    };

    if (isValidMove(to, grid)) {
      setIsMoving(false);
      setAnimateClass(`${direction}-movement`);
      if (addAnimateToSquare)
        addAnimateToSquare(to, oppositeDirection(direction));

      setTimeout(() => {
        setAnimateClass("");
        if (removeAnimateFromSquare) removeAnimateFromSquare(to);
        const updatedGrid = moveSquare(from, to, grid);
        updateGrid(updatedGrid);
      }, 500);
    }
  };

  return (
    <div
      draggable
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      className={`border border-gray-500 rounded-md ${animateClass} ${className}`}
      style={{
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
      }}
    >
      {children}
    </div>
  );
}
