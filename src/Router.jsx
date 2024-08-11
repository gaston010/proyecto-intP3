import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/Login";
import Home from "./components/home/Home";
import ForgotPassword from "./components/ForgotPassword";
import News from "./components/News";
import MainLayout from "./components/MainLayout";
import Underconstruction from "./components/Underconstruction";
import GenreList from "./components/GenreList";
import { SongList } from "./components/SongList";
// import SongsList from "./components/playlist/SongsList"
import AddArtistAssignment from "./components/AddArtistAssignment";
// import Sidebar from "./components/Sidebar";
// import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute"; // Asegúrate de importar PrivateRoute
import Profile from "./components/profile/profile";
import Logout from "./components/Logout";
import { CgPlayList } from "react-icons/cg";
// import { SongsList } from "./components/playlist/SongsList";

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
        element: <SongList/>,
      },
      {
        path: "/add",
        element: <AddArtistAssignment />,
      },
      {
        path: "/profile",
        element: <Profile/>
      },
      {
        path: "/logout",
        element: <Logout/>
      }
    ],
  },
  {
    path: "*",
    element: <Underconstruction />,
  },
]);

export default Router;
