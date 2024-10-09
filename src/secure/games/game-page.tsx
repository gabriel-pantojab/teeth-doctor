import { GameCard } from "./components/game-card";

export function GamePage() {
  return (
    <section className="p-4">
      <section className="flex flex-col gap-2">
        <GameCard
          title="Juego de memoria"
          banner="https://via.placeholder.com/150"
        />
      </section>
    </section>
  );
}
