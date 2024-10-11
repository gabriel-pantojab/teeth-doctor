import Heart from "@/secure/components/icons/heart";
import Timer from "@/secure/components/timer";
import { Link } from "react-router-dom";

interface HeaderProps {
  pausedTimer?: boolean;
}

export default function Header({ pausedTimer }: HeaderProps) {
  return (
    <section className="w-full grid grid-cols-3">
      <div className="flex flex-col">
        <h2>
          <span className="font-bold">Puntos: </span> 1200
        </h2>

        <h2 className="flex gap-2 items-center">
          <Heart color="red" height={20} width={20} />

          <span>x3</span>
        </h2>
      </div>

      <div className="flex justify-center">
        <Timer paused={pausedTimer} duration={120} decresing />
      </div>

      <div className="flex justify-end">
        <Link to="/games">Salir</Link>
      </div>
    </section>
  );
}
