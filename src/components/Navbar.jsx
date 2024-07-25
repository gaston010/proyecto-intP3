// import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaHome, FaUserPlus, FaKey } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { FcNews } from "react-icons/fc";
import "../Style.css";

function Navbar() {
  const location = useLocation();
  {
    ("useLocation: Obtiene la ubicación actual de la ruta. Esto permite saber cuál es la ruta activa en el navegador.");
  }

  const isLoginPage = location.pathname === "/login";
  const isForgotPage = location.pathname === "/forgot";

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <span className="icon">
            {location.pathname === "/" ? <FcNews /> : <FaHome />}
          </span>
          Home
        </Link>
        <Link to="/news" className="navbar-item">
          <span className="icon">
            {location.pathname === "/news" ? <FcNews /> : <FaRegNewspaper />}
          </span>
          News
        </Link>
        <Link to="/ne" className="navbar-item">
          <span className="icon">
            {location.pathname === "/ne" ? <FcNews /> : <FaRegNewspaper />}
          </span>
          Ne
        </Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link
                to="/login"
                className={`button is-primaty ${isLoginPage ? "blink" : ""}`}
              >
                <span className="icon">
                  <FaUserPlus />
                </span>
                Login
              </Link>
              <Link
                to="/forgot"
                className={`button is-link ${isForgotPage ? "blink" : "blank"}`}
              >
                <span className="icon">
                  <FaKey />
                </span>
                Forgot password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
