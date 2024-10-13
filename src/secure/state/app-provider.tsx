import { useState } from "react";
import { AppContext } from "./app-context";
import { getLivesStorage } from "@/storage/storage";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [lives, updateLives] = useState(() => {
    const lives = getLivesStorage();
    return lives;
  });

  return (
    <AppContext.Provider value={{ lives, updateLives }}>
      {children}
    </AppContext.Provider>
  );
}
