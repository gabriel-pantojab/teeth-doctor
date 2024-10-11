import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { AppProvider } from "./state/app-provider";

export function SecurePage() {
  const location = useLocation();
  const regex = /^\/games\/.+/;

  return (
    <AppProvider>
      <article className="bg-[#e4f7ff] w-full h-full grid grid-rows-[auto_1fr_auto]">
        <header className="bg-[#3C7DDE] w-full flex justify-between p-2 text-white">
          <div>Teeth Doctor</div>
        </header>

        <main className="overflow-auto pb-2 mb-2">
          <Outlet />
        </main>

        {!regex.test(location.pathname) && <Navbar />}
      </article>
    </AppProvider>
  );
}
