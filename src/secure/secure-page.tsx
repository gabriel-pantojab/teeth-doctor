import { Navbar } from "./components/navbar";
import { LessonPage } from "./lessons/lesson-page";

export function SecurePage() {
  return (
    <article className="w-full h-full grid grid-rows-[auto_1fr_auto]">
      <header className="w-full flex justify-between p-2 border-b-2 border-gray-300">
        <div>Gabriel</div>

        <div>Teeth Doctor</div>
      </header>

      <main className="overflow-auto">
        <LessonPage />
      </main>

      <Navbar />
    </article>
  );
}
