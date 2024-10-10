import { TouchEvent, useContext, useState } from "react";
import { Point } from "../models/point";
import { Position } from "../utils/game";
import { TeethCrushContext } from "../state/teeth-crush-context";
import { HEIGHT, WIDTH } from "../models/constants";

interface SquareProps {
  children: React.ReactNode;
  position: Position;
  className?: string;
}

export function Square({ children, position, className }: SquareProps) {
  const { moveSquareAction } = useContext(TeethCrushContext);
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

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
    const { clientX: x, clientY: y } = touch;

    moveSquareAction({ x, y }, { x: startPoint.x, y: startPoint.y }, position);
  };

  return (
    <div
      draggable
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      className={`border border-gray-500 rounded-md ${className}`}
      style={{
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
      }}
    >
      {children}
    </div>
  );
}
