import { TeethCrushProvider } from "./state/teeth-crush-provider";
import TeethCrushGame from "./components/teeth-crush-game";

export function TeethCrush() {
  return (
    <TeethCrushProvider>
      <TeethCrushGame />
    </TeethCrushProvider>
  );
}
