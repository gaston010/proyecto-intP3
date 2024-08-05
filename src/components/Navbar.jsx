import { useLocation, Link } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import Cookies from "js-cookie";
import "../Style.css";

function Navbar() {
  const location = useLocation();
  const token = Cookies.get("authToken");

  const isLoginPage = location.pathname === "/login";

  const handleLogout = () => {
    Cookies.remove("authToken");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div
        className="navbar-brand ml-5 gap-x-2"
        style={{ alignItems: "center" }}
      >
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
              {token ? (
                <button onClick={handleLogout} className="button is-primary">
                  <span>Login</span>
                  <span className="icon">
                    <IoIosLogIn />
                  </span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`button is-primary ${isLoginPage ? "blink" : ""}`}
                >
                  <span>Login</span>
                  <span className="icon">
                    <IoIosLogIn />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
