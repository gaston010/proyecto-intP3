import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Background from './Background';
// import SideBar from "./Sidebar";
import { useLocation } from 'react-router-dom';
import PlaybackBar from './PlaybackBar';
import SideMenu from './SideMenu';
import Navbar from './Navbar';

const MainLayout = () => {
  const location = useLocation();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);

  // Lista de rutas que no deberían tener fondo
  const noBackgroundRoutes = ['/underconstruction'];
  const noNavBarRoutes = ['/', '/login'];

  // Comprueba si la ruta actual está en la lista de rutas sin fondo
  const showBackground = !noBackgroundRoutes.includes(location.pathname);

  const homePath = noNavBarRoutes.includes(location.pathname);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh',
        minWidth: '100vw'
      }}
    >
      <div style={{ flex: '1' }}>
        {homePath ? (
          <Navbar />
        ) : (
          <SideMenu
            className={isSideMenuOpen ? 'open' : 'closed'}
            toggleSideMenu={toggleSideMenu}
            style={{ flex: '1', minHeight: '100vh', minWidth: '' }}
          />
        )}
      </div>
      <section
        className={isSideMenuOpen ? 'with-sidemenu' : 'without-sidemenu'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <main className="main">
          {showBackground ? (
            <Background>
              <Outlet />
            </Background>
          ) : (
            <Outlet />
          )}
        </main>
        <PlaybackBar />
      </section>
    </div>
  );
};

export default MainLayout;
