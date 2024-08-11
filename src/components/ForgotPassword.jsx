// import React from "react";
import { FaUser } from "react-icons/fa"; // Importa íconos de FontAwesome
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
// import Background from "./Background"; // Importa el componente de fondo si lo estás usando

const ForgotPasswordForm = () => {
  const { darkTheme} = useContext(ThemeContext);
  return (
      <div className={`forgot-password ${darkTheme ? 'dark-theme border-dark-theme' : 'light-theme border-light-theme'}`}>
        <form>
        <div className="field">
          <div className="control has-icons-left">
            <input className="input" type="text" placeholder="Email" required />
            <span className="icon is-small is-left">
              <FaUser />
            </span>
          </div>
        </div>
        <div className="field is-grouped is-grouped-centered">
            <Link to="/login">
              <button className={ `button ${darkTheme ? 'dark-theme border-dark-theme' : 'light-theme border-light-theme'}`} >Back to Login</button>
            </Link>
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-primary">Submit</button>
            </div>
          </div>
        </div>
      </form>
      </div>


  );
};

export default ForgotPasswordForm;
