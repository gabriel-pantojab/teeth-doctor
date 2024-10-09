import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../public/login/login-page";
import { SecurePage } from "@secure/secure-page";
import { LessonPage } from "@secure/lessons/lesson-page";
import { GamePage } from "@secure/games/game-page";

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
      },
    ],
  },
]);
