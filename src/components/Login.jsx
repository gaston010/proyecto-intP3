import { FaUser, FaLock } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { TiUserAdd } from "react-icons/ti";
import { IoKey } from "react-icons/io5";
import { Link } from "react-router-dom";
import backgroundImage from "/src/assets/background-login.webp";

const LoginForm = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="columns is-centered" style={backgroundStyle}>
      <div className="column is-one-third">
        <form>
          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Username"
                required
              />
              <span className="icon is-small is-left">
                <FaUser />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Password"
                required
              />
              <span className="icon is-small is-left">
                <FaLock />
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" />
                Remember me
              </label>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link is-hovered">
                <span>Login</span>
                <span className="icon">
                  <LuLogIn />
                </span>
              </button>
            </div>
            <div className="control">
              <Link to="/forgot-password">Forgot password</Link>
              <span className="icon">
                <IoKey />
              </span>
            </div>
          </div>
          <div className="field">
            <p className="has-text-centered">
              <Link to="/register">
                <span className="icon">
                  <TiUserAdd />
                </span>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
