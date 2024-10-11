import { Link } from "react-router-dom";

interface GameCardProps {
  title: string;
  banner: string;
}

export function GameCard({ title, banner }: GameCardProps) {
  return (
    <article>
      <Link
        to={`/games/${title.toLowerCase().replace(" ", "-")}`}
        className="bg-white flex flex-col gap-2 rounded-md p-4 shadow-md text-black w-[280px]"
      >
        <figure className="rounded-md w-full h-[280px] overflow-hidden">
          <img
            className="w-full h-full object-contain"
            src={banner}
            alt={title}
          />
        </figure>

        <h2 className="text-center font-bold">{title}</h2>
      </Link>
    </article>
  );
}
