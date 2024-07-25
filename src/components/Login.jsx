// import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { IoKey } from "react-icons/io5";
import "../Style.css";

const LoginForm = () => {
  return (
    <div className="column is-one-third">
      <form>
        <div className="box has-background-transparent">
          <div className="field">
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
              <button className="button is-primary">
                <span>Login</span>
                <span className="icon">
                  <LuLogIn />
                </span>
              </button>
            </div>
            <div className="control">
              <Link to="/forgot" className="button is-link">
                <span>Forgot password</span>
                <span className="icon">
                  <IoKey />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
