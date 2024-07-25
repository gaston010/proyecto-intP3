// import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";  
import Background from "./Background";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
      <Background>
        <Outlet />
      </Background>
      </main>
    </div>
  );
};

export default MainLayout;
