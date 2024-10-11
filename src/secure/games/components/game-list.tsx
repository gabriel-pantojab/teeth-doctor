import { GameCard } from "./game-card";

export function GameList() {
  return (
    <section className="flex flex-col gap-2 items-center">
      <GameCard title="Teeth Crush" banner={"/src/assets/teeth-crush.webp"} />
    </section>
  );
}
