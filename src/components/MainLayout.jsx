// import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Background from "./Background";


const MainLayout = () => {
  const location = useLocation();

  // Lista de rutas que no deberían tener fondo
  const noBackgroundRoutes = ["/underconstruction"];

  // Comprueba si la ruta actual está en la lista de rutas sin fondo
  const showBackground = !noBackgroundRoutes.includes(location.pathname);

  return (
    <div>
      <Navbar />
      <main>
        {showBackground ? (
          <Background>
            <Outlet />
          </Background>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default MainLayout;
