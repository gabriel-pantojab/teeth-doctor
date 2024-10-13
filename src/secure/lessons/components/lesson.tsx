interface LessonProps {
  title: string;
  video: string;
}

export function Lesson({ title, video }: LessonProps) {
  return (
    <section className="border-2 rounded-md p-2 flex flex-col gap-2 bg-white">
      <header className="flex justify-center">
        <h2 className="font-bold">{title}</h2>
      </header>

      <section className="flex border-2 rounded-md h-96 w-full overflow-hidden">
        <video className="w-full object-cover" src={video} controls></video>
      </section>
    </section>
  );
}
