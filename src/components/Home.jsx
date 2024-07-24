import { FaHome, FaUserPlus, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <span className="icon">
            <FaHome />
          </span>
          Home
        </Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/register" className="button is-primary">
                <span className="icon">
                  <FaUserPlus />
                </span>
                Register
              </Link>
              <Link to="/forgot-password" className="button is-link">
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
};

export default Navbar;
