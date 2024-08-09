import { useState } from 'react';
import Background from './Background';
import PlaybackBar from './PlaybackBar';
import SideMenu from './SideMenu';
import Navbar from './Navbar';

import { Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import { MediaProvider } from '../context/MediaContext';

const MainLayout = () => {
  const location = useLocation();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
  const token = Cookies.get('authToken');

  const noBackgroundRoutes = ['/underconstruction'];
  const noNavBarRoutes = ['/', '/login'];

  const showBackground = !noBackgroundRoutes.includes(location.pathname);

  const homePath = noNavBarRoutes.includes(location.pathname);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <MediaProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          minHeight: '100vh',
          minWidth: '100vw'
        }}
      >
        <div style={{ flex: '1' }}>
          {homePath || !token ? (
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
