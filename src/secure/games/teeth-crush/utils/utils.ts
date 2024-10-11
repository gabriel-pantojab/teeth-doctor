import { COUNT_IMAGES } from "../models/constants";
import { Point } from "../models/point";
import { GridType } from "../state/teeth-crush-context";
import { canCrushAll } from "./game";

export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
  Invalid = "invalid",
}

export const DirectionVector: Record<Direction, Point> = {
  [Direction.Up]: { x: 0, y: -1 },
  [Direction.Down]: { x: 0, y: 1 },
  [Direction.Left]: { x: -1, y: 0 },
  [Direction.Right]: { x: 1, y: 0 },
  [Direction.Invalid]: { x: 0, y: 0 },
};

export function determineDirection(p1: Point, p2: Point): Direction {
  const { x: x1, y: y1 } = p1;
  const { x: x2, y: y2 } = p2;
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? Direction.Right : Direction.Left;
  } else {
    return dy > 0 ? Direction.Down : Direction.Up;
  }
}

export function oppositeDirection(direction: Direction): Direction {
  switch (direction) {
    case Direction.Up:
      return Direction.Down;
    case Direction.Down:
      return Direction.Up;
    case Direction.Left:
      return Direction.Right;
    case Direction.Right:
      return Direction.Left;
    default:
      return Direction.Invalid;
  }
}

export function generateGrid(n: number, m: number): GridType[][] {
  let grid;
  do {
    grid = Array.from({ length: n }, () =>
      Array.from({ length: m }, () => ({
        value: Math.floor(Math.random() * COUNT_IMAGES) + 1,
        className: "",
      }))
    );
  } while (canCrushAll(grid));

  return grid;
}
