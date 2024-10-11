import { GameCard } from "./game-card";

export function GameList() {
  return (
    <section className="flex w-full h-full flex-col gap-2 items-center">
      <GameCard title="Trivia" banner={"/src/assets/trivia.webp"} />

      <GameCard title="Teeth Crush" banner={"/src/assets/teeth-crush.webp"} />
    </section>
  );
}
