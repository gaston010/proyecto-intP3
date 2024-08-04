import { Outlet, useLocation } from "react-router-dom";
import Background from "./Background";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import Cookies from "js-cookie";

const MainLayout = () => {
  const location = useLocation();
  const token = Cookies.get("authToken");

  const noBackgroundRoutes = ["/underconstruction"];
  const noNavBarRoutes = ["/", "/login"];

  const showBackground = !noBackgroundRoutes.includes(location.pathname);

  const homePath = noNavBarRoutes.includes(location.pathname);

  return (
    <div>
      {homePath || !token ? <Navbar /> : <SideMenu />}
      <div style={{ display: "flex" }}>
        <main style={{ flex: 1 }}>
          {showBackground ? (
            <Background>
              <Outlet />
            </Background>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
