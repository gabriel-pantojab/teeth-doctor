import { Outlet } from "react-router-dom";

export function GamePage() {
  return (
    <section className="p-4 h-full relative">
      <Outlet />
    </section>
  );
}
