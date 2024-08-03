// import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaHome, FaUserCircle, FaKey } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { FcNews } from "react-icons/fc";
import { IoIosLogIn } from "react-icons/io";
import { FaMusic } from "react-icons/fa";
import "../Style.css";

function Navbar() {
  const location = useLocation();
  {
    // useLocation: Gets the current location of the route. This allows you to know which route is active in the browser.
  }

  const isLoginPage = location.pathname === "/login";
  // const isForgotPage = location.pathname === "/forgot";

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand ml-5 gap-x-2" style={{ alignItems: 'center' }}>
        {/* Navbar main items */}
        <Link to="/">
          <span className="icon">
            <FaMusic />
          </span>
          <span className="font-bold text-lg">MusicApp</span>
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
                <span>
                  Login
                </span>
                <span className="icon">
                <IoIosLogIn />
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
