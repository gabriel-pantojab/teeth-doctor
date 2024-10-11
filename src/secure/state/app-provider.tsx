import { useState } from "react";
import { AppContext } from "./app-context";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [lives, updateLives] = useState(3);
  return (
    <AppContext.Provider value={{ lives, updateLives }}>
      {children}
    </AppContext.Provider>
  );
}
