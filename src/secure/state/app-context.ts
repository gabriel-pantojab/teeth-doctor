import { createContext } from "react";

interface AppContextType {
  lives: number;
  updateLives: React.Dispatch<React.SetStateAction<number>>;
}

export const AppContext = createContext<AppContextType>({
  lives: 0,
  updateLives: () => {},
});
