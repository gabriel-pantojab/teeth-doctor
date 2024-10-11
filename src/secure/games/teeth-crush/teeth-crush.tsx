import { useRef, useState } from "react";
import { Grid } from "./components/grid";
import { GridType, TeethCrushContext } from "./state/teeth-crush-context";
import { generateGrid } from "./utils/utils";
import { useTeethCrush } from "./hooks/use-teeth-crush";
import { GRID_COLUMNS, GRID_ROWS } from "./models/constants";
import Header from "./components/header";

import music from "@/assets/music/music.mp3";
import Play from "@/secure/components/icons/play";

export function TeethCrush() {
  const [grid, setGrid] = useState<GridType[][]>(
    generateGrid(GRID_ROWS, GRID_COLUMNS)
  );
  const { moveSquareAction } = useTeethCrush({ grid, updateGrid: setGrid });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <TeethCrushContext.Provider
      value={{
        grid,
        updateGrid: setGrid,
        moveSquareAction,
      }}
    >
      <section className="w-full h-full flex flex-col gap-4">
        <Header pausedTimer={!isPlaying} />

        <section className="w-full h-full flex flex-col justify-center items-center">
          <Grid />
        </section>

        <audio loop ref={audioRef} src={music}></audio>

        {!isPlaying && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <button
              className="bg-blue-500 text-white border-2 border-white rounded-full p-4"
              onClick={() => {
                setIsPlaying(!isPlaying);
                audioRef.current?.play();
              }}
            >
              <Play color="white" height={50} width={50} />
            </button>
          </div>
        )}
      </section>
    </TeethCrushContext.Provider>
  );
}
