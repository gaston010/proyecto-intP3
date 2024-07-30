// import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaHome, FaUserCircle, FaKey } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { FcNews } from "react-icons/fc";
import "../Style.css";

function Navbar() {
  const location = useLocation();
  {
    ("useLocation: Obtiene la ubicación actual de la ruta. Esto permite saber cuál es la ruta activa en el navegador.");
  }

  const isLoginPage = location.pathname === "/login";
  // const isForgotPage = location.pathname === "/forgot";

  const showSideMenu = true; // Set to true or false based on your requirement

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div>
      </div>
      {showSideMenu && (
        <div className="navbar-start">
          {/* Navbar side items */}
          <select>
          <option value="someOption"><span className="icon">
            Profile
            <FaUserCircle />
            </span>
          </option>
          <option value="otherOption"><span className="icon">
            Logout
            <FaKey />
            </span>
          </option>
          </select>
        </div>
      )}

      <div className="navbar-brand">
        {/* Navbar main items */}
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
        <Link to="/genre" className="navbar-item">
          <span className="icon">
            {location.pathname === "/genre" ? <FcNews /> : <FaRegNewspaper />}
          </span>
          GenreList
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
                  <FaUserCircle />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
