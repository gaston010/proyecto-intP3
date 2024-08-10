import React, { useState, useContext } from 'react';
import Background from './Background';
import PlaybackBar from './PlaybackBar';
import SideMenu from './SideMenu';
import Navbar from './Navbar';

import { Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import { MediaProvider } from '../context/MediaContext';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';

const MainLayout = () => {
  const location = useLocation();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
  const token = Cookies.get('authToken');


  const noBackgroundRoutes = ['/underconstruction'];
  const noNavBarRoutes = ['/', '/login'];

  const showBackground = !noBackgroundRoutes.includes(location.pathname);

  const homePath = noNavBarRoutes.includes(location.pathname);

  const { darkTheme } = useContext(ThemeContext);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };



  return (
    <MediaProvider>
      <div
      className={darkTheme ? 'dark-theme' : 'light-theme'}
        style={{
          display: 'flex',
          flexDirection: 'row',
          minHeight: '100vh',
          minWidth: '100vw'
        }}
      >
        <ThemeToggle />
        <div style={{ flex: '1.5' }}>
          {homePath || !token ? (
            <Navbar />
          ) : (
            <SideMenu
              className={isSideMenuOpen ? 'open' : 'closed'}
              toggleSideMenu={toggleSideMenu}
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
          <main className="main" style={{ flex: 1 }}>
            {showBackground ? (
              <Background>
                <Outlet />
              </Background>
            ) : (
              <Outlet />
            )}
          </main>
          {token ? <PlaybackBar /> : ''}
        </section>
      </div>
    </MediaProvider>
  );
};

export default MainLayout;
