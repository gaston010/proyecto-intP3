import React from "react";
import { Outlet } from "react-router-dom";
import Background from "./Background";
// import SideBar from "./Sidebar";
import { useLocation } from "react-router-dom";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";


const MainLayout = () => {
  const location = useLocation();

  // Lista de rutas que no deberían tener fondo
  const noBackgroundRoutes = ["/underconstruction"];
  const noNavBarRoutes = ['/', '/login'];

  // Comprueba si la ruta actual está en la lista de rutas sin fondo
  const showBackground = !noBackgroundRoutes.includes(location.pathname);

  const homePath = noNavBarRoutes.includes(location.pathname);

  return (
    <div>
      { homePath ? <Navbar/> :  <SideMenu/>}
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
