import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Grid } from "./grid";
import Header from "./header";
import { AppContext } from "@/secure/state/app-context";
import music from "/assets/sounds/music.mp3";
import Play from "@/secure/components/icons/play";
import { TeethCrushContext } from "../state/teeth-crush-provider";

export default function TeethCrushGame() {
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
  );
}
