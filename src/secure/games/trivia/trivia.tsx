import TriviaGame from "./components/trivia-game";
import { TriviaProvider } from "./state/trivia-provider";

export default function Trivia() {
  return (
    <TriviaProvider>
      <TriviaGame />
    </TriviaProvider>
  );
}
