import Heart from "@/secure/components/icons/heart";
import { GameCard } from "./game-card";
import { useContext } from "react";
import { AppContext } from "@/secure/state/app-context";

export function GameList() {
  const { lives } = useContext(AppContext);

  return (
    <section className="flex w-full h-full flex-col gap-2 items-center">
      <div className="w-full flex items-center gap-1">
        <Heart width={20} height={20} color="red" />

        <span className="font-bold">x{lives}</span>
      </div>

      <GameCard title="Trivia" banner={"/src/assets/trivia.webp"} />

      <GameCard title="Teeth Crush" banner={"/src/assets/teeth-crush.webp"} />
    </section>
  );
}
