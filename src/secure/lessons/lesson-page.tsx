import { Lesson } from "./components/lesson";

export function LessonPage() {
  return (
    <section className="p-4">
      <section className="flex flex-col gap-4">
        <Lesson
          title="Como lavarse los dientes"
          video="/assets/videos/lesson-1.mp4"
        />
      </section>
    </section>
  );
}
