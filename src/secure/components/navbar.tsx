import { Link } from "react-router-dom";
import { BookIcon } from "./icons/book-icon";
import { GameIcon } from "./icons/game-icon";
import InfoIcon from "./icons/info-icon";

export function Navbar() {
  return (
    <nav className="p-2 rounded-t-md bg-white shadow-md">
      <ul className="w-full flex justify-center gap-10">
        <li>
          <Link to="/lessons">
            <BookIcon width={30} height={30} />
          </Link>
        </li>

        <li>
          <Link to="/games">
            <GameIcon width={30} height={30} />
          </Link>
        </li>

        <li>
          <Link to="/about">
            <InfoIcon width={30} height={30} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
