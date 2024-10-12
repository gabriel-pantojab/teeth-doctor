import { TouchEvent, useContext, useState } from "react";
import { Point } from "../models/point";
import { Position } from "../utils/game";
import { HEIGHT, images, WIDTH } from "../models/constants";
import { TeethCrushContext } from "../state/teeth-crush-provider";

interface SquareProps {
  value: number;
  position: Position;
  className?: string;
}

export function Square({ position, className, value }: SquareProps) {
  const { moveSquareAction } = useContext(TeethCrushContext);
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    setStartPoint({ x: clientX, y: clientY });
    setIsMoving(true);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isMoving) return;

    const { clientX: x, clientY: y } = e;
    setIsMoving(false);

    moveSquareAction({ x, y }, { x: startPoint.x, y: startPoint.y }, position);
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    const { clientX, clientY } = touch;

    setStartPoint({ x: clientX, y: clientY });
    setIsMoving(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isMoving) return;

    const touch = e.touches[0];
    const { clientX: x, clientY: y } = touch;
    setIsMoving(false);

    moveSquareAction({ x, y }, { x: startPoint.x, y: startPoint.y }, position);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      className={`border border-gray-500 rounded-md ${className} bg-white cursor-pointer`}
      style={{
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
      }}
    >
      <img
        className="w-full h-full object-cover"
        src={images[value - 1]}
        alt="hola"
      />
    </div>
  );
}
