interface LessonProps {
  title: string;
}

export function Lesson({ title }: LessonProps) {
  return (
    <section className="border-2 rounded-md p-2 flex flex-col gap-2">
      <header>
        <h2>{title}</h2>
      </header>

      <video src=""></video>
    </section>
  );
}
