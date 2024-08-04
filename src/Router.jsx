// import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/Login";
import Home from "./components/home/Home";
import ForgotPassword from "./components/ForgotPassword";
import News from "./components/News";
import MainLayout from "./components/MainLayout";
import Underconstruction from "./components/Underconstruction";
import GenreList from "./components/GenreList";
import SongList from "./components/SongList";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/forgot",
        element: <ForgotPassword />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/genre",
        element: <GenreList />,
      },
      {
        path: "/songs",
        element: <SongList />,
      }
    ],
  },
  {
    path: "*",
    element: <Underconstruction />,
  },
]);

export default Router;
