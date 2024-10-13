interface LessonProps {
  title: string;
  video?: string;
  image?: string;
}

export function Lesson({ title, video, image }: LessonProps) {
  return (
    <section className="border-2 rounded-md p-2 flex flex-col gap-2 bg-white">
      <header className="flex justify-center">
        <h2 className="font-bold text-center">{title}</h2>
      </header>

      <section className="flex border-2 rounded-md max-h-96 w-full overflow-hidden">
        {video ? (
          <video className="w-full object-cover" src={video} controls></video>
        ) : (
          <img className="w-full object-contain" src={image} alt={title} />
        )}
      </section>
    </section>
  );
}
