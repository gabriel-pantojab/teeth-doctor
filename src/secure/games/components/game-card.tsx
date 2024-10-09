interface GameCardProps {
  title: string;
  banner: string;
}

export function GameCard({ title, banner }: GameCardProps) {
  return (
    <article className="bg-white flex flex-col gap-2 rounded-md p-2 shadow-md">
      <figure className="rounded-md w-70 h-70 overflow-hidden">
        <img className="w-full h-full" src={banner} alt={title} />
      </figure>

      <h2 className="text-center font-bold">{title}</h2>
    </article>
  );
}
