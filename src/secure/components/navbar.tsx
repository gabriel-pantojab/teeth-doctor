import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="p-2 border-t-2 border-gray-300 rounded-md">
      <ul className="w-full flex justify-center gap-3">
        <li>
          <Link to="/lessons">Leccion</Link>
        </li>

        <li>
          <Link to="/games">Juegos</Link>
        </li>
      </ul>
    </nav>
  );
}
