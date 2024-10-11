import { GridType } from "../state/teeth-crush-context";

export const WIDTH = 55;
export const HEIGHT = 55;
export const GRID_ROWS = 5;
export const GRID_COLUMNS = 5;
export const COUNT_TO_CRUSH = 3;

export const testGrid: GridType[][] = [
  [
    { value: 2, className: "" },
    { value: 2, className: "" },
    { value: 3, className: "" },
    { value: 2, className: "" },
    { value: 5, className: "" },
  ],
  [
    { value: 2, className: "" },
    { value: 2, className: "" },
    { value: 3, className: "" },
    { value: 2, className: "" },
    { value: 5, className: "" },
  ],
  [
    { value: 1, className: "" },
    { value: 2, className: "" },
    { value: 3, className: "" },
    { value: 4, className: "" },
    { value: 5, className: "" },
  ],
  [
    { value: 1, className: "" },
    { value: 2, className: "" },
    { value: 3, className: "" },
    { value: 4, className: "" },
    { value: 5, className: "" },
  ],
  [
    { value: 1, className: "" },
    { value: 2, className: "" },
    { value: 3, className: "" },
    { value: 4, className: "" },
    { value: 5, className: "" },
  ],
];

export const images: string[] = [
  "/src/assets/diente.webp",
  "/src/assets/pack.webp",
  "/src/assets/cepillo.webp",
  "/src/assets/pasta.webp",
  "/src/assets/caries.webp",
  "/src/assets/brackets.webp",
];
export const COUNT_IMAGES = images.length;
