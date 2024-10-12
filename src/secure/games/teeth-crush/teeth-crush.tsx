import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { GridType, TeethCrushContext } from "./state/teeth-crush-context";
import { AppContext } from "@/secure/state/app-context";

import { Grid } from "./components/grid";
import Header from "./components/header";
import Play from "@/secure/components/icons/play";
import { useTeethCrush } from "./hooks/use-teeth-crush";

import { GRID_COLUMNS, GRID_ROWS } from "./models/constants";
import { generateGrid } from "./utils/utils";

import music from "/assets/sounds/music.mp3";

function TeethCrushProvider({ children }: { children: React.ReactNode }) {
  const [grid, setGrid] = useState<GridType[][]>(
    generateGrid(GRID_ROWS, GRID_COLUMNS)
  );
  const [score, setScore] = useState(0);
  const [timerDuration, setTimerDuration] = useState(120);
  const { moveSquareAction } = useTeethCrush({ grid, updateGrid: setGrid });

  return (
    <TeethCrushContext.Provider
      value={{
        grid,
        updateGrid: setGrid,
        moveSquareAction,
        score,
        updateScore: setScore,
        timerDuration,
        updateTimerDuration: setTimerDuration,
      }}
    >
      {children}
    </TeethCrushContext.Provider>
  );
}

export function TeethCrush() {
  const { score, updateTimerDuration } = useContext(TeethCrushContext);
  const { lives, updateLives } = useContext(AppContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const endTimeAction = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
    if (score < 1200 && lives > 0) {
      updateLives(lives - 1);
    }
  };

  return (
    <TeethCrushProvider>
      <section className="w-full h-full flex flex-col gap-4">
        <Header
          pausedTimer={!isPlaying}
          lives={lives}
          score={score}
          endTimeAction={endTimeAction}
        />

        <section className="w-full h-full flex flex-col justify-center items-center">
          <Grid />
        </section>

        <audio loop ref={audioRef} src={music}></audio>

        {!isPlaying && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="flex flex-col justify-center items-center bg-white p-2 rounded-md">
              {lives > 0 ? (
                <button
                  className="bg-blue-500 text-white border-2 border-white rounded-full p-4"
                  onClick={() => {
                    if (lives === 0) return;
                    setIsPlaying(!isPlaying);
                    audioRef.current?.play();
                    if (updateTimerDuration) updateTimerDuration(120);
                  }}
                >
                  <Play color="white" height={50} width={50} />
                </button>
              ) : (
                <h1 className="text-3xl">No tienes vidas</h1>
              )}

              <Link to="/games">Volver</Link>
            </div>
          </div>
        )}
      </section>
    </TeethCrushProvider>
  );
}
