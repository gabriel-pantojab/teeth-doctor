import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar";

export function SecurePage() {
  return (
    <article className="bg-[#e4f7ff] w-full h-full grid grid-rows-[auto_1fr_auto]">
      <header className="bg-[#3C7DDE] w-full flex justify-between p-2 text-white">
        <div>Gabriel</div>

        <div>Teeth Doctor</div>
      </header>

      <main className="overflow-auto">
        <Outlet />
      </main>

      <Navbar />
    </article>
  );
}
