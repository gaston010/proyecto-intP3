import LoginForm from "./components/Login";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import News from "./components/News";
import MainLayout from "./components/MainLayout";

import { createBrowserRouter } from "react-router-dom";

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
      }
    ],
  },
]);

export default Router;
