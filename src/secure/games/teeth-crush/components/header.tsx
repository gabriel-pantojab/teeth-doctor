import Heart from "@/secure/components/icons/heart";
import Timer from "@/secure/components/timer";
import { Link } from "react-router-dom";

interface HeaderProps {
  pausedTimer?: boolean;
  lives: number;
  score: number;
  endTimeAction?: () => void;
  timerDuration?: number;
}

export default function Header({
  pausedTimer,
  lives,
  score,
  timerDuration = 120,
  endTimeAction,
}: HeaderProps) {
  return (
    <section className="w-full grid grid-cols-3">
      <div className="flex flex-col">
        <h2>
          <span className="font-bold">Puntos: </span> {score}
        </h2>

        <h2 className="flex gap-2 items-center">
          <Heart color="red" height={20} width={20} />

          <span>x{lives}</span>
        </h2>
      </div>

      <div className="flex justify-center">
        <Timer
          paused={pausedTimer}
          duration={timerDuration}
          decresing
          endTime={endTimeAction}
        />
      </div>

      <div className="flex justify-end">
        <Link to="/games">Salir</Link>
      </div>
    </section>
  );
}
