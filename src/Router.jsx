import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm"
import Home from "./components/home/Home";
import News from "./components/News/News";
import ForgotPassword from "./components/ForgotPasswordForm/ForgotPassword"
import MainLayout from "./components/MainLayout/MainLayout";
import Underconstruction from "./components/Underconstruction/Underconstruction";
import GenreList from "./components/GenreList/GenreList";
import SongList from "./components/SongList/SongList";
import PrivateRoute from "./components/PrivateRoute/"

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
        element: (
          <PrivateRoute>
            <News />
          </PrivateRoute>
        ),
      },
      {
        path: "/genre",
        element: (
          <PrivateRoute>
            <GenreList />
          </PrivateRoute>
        ),
      },
      {
        path: "/songs",
        element: <SongList />,
      },
    ],
  },
  {
    path: "*",
    element: <Underconstruction />,
  },
]);

export default Router;
