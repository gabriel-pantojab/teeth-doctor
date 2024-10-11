import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../public/login/login-page";
import { SecurePage } from "@secure/secure-page";
import { LessonPage } from "@secure/lessons/lesson-page";
import { GamePage } from "@secure/games/game-page";
import { GameList } from "@/secure/games/components/game-list";
import { TeethCrush } from "@/secure/games/teeth-crush/teeth-crush";
import Trivia from "@/secure/games/trivia/trivia";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <SecurePage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/lessons" replace />,
      },
      {
        path: "/lessons",
        element: <LessonPage />,
      },
      {
        path: "/games",
        element: <GamePage />,
        children: [
          {
            path: "/games/",
            element: <GameList />,
          },
          {
            path: "/games/teeth-crush",
            element: <TeethCrush />,
          },
          {
            path: "/games/trivia",
            element: <Trivia />,
          },
        ],
      },
    ],
  },
]);
