import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Grid } from "./grid";
import Header from "./header";
import { AppContext } from "@/secure/state/app-context";
import music from "/assets/sounds/music.mp3";
import Play from "@/secure/components/icons/play";
import { TeethCrushContext } from "../state/teeth-crush-provider";
import { generateGrid } from "../utils/utils";
import {
  GRID_COLUMNS,
  GRID_ROWS,
  GROW_FACTOR_LEVEL,
  GROW_FACTOR_TIME,
} from "../models/constants";

const audio = new Audio(music);

export default function TeethCrushGame() {
  const {
    score,
    updateScore,
    timerDuration,
    level,
    updateLevel,
    updateGrid,
    updateTimerDuration,
  } = useContext(TeethCrushContext);
  const { lives, updateLives } = useContext(AppContext);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const endTimeAction = () => {
    setIsPlaying(false);
    audio.pause();
    audio.currentTime = 0;
    if (score < level * GROW_FACTOR_LEVEL && lives > 0) {
      updateLives(lives - 1);
    }
    updateScore(0);
    updateLevel(1);
    updateTimerDuration(180);
  };

  useEffect(() => {
    if (score >= level * GROW_FACTOR_LEVEL) {
      updateLevel(level + 1);
      updateTimerDuration(timerDuration - GROW_FACTOR_TIME);
      updateGrid(generateGrid(GRID_ROWS, GRID_COLUMNS));
      updateScore(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, level]);

  return (
    <section className="w-full h-full flex flex-col gap-4">
      <Header
        goalScore={level * GROW_FACTOR_LEVEL}
        pausedTimer={!isPlaying}
        lives={lives}
        score={score}
        timerDuration={timerDuration}
        endTimeAction={endTimeAction}
      />

      <section className="w-full h-full flex flex-col justify-center items-center">
        <Grid />
      </section>

      {!isPlaying && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="flex flex-col justify-center items-center bg-white p-2 rounded-md">
            {lives > 0 ? (
              <button
                className="bg-blue-500 text-white border-2 border-white rounded-full p-4"
                onClick={() => {
                  if (lives === 0) return;
                  setIsPlaying(true);
                  audio.play();
                  audio.loop = true;
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
  );
}
