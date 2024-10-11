import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="p-2 rounded-t-md bg-white shadow-md">
      <ul className="w-full flex justify-center gap-3">
        <li>
          <Link to="/lessons">Lección</Link>
        </li>

        <li>
          <Link to="/games">Juegos</Link>
        </li>
      </ul>
    </nav>
  );
}
