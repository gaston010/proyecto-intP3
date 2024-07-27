// import React from "react";
import { FaUser } from "react-icons/fa"; // Importa íconos de FontAwesome
import { Link } from "react-router-dom";
// import Background from "./Background"; // Importa el componente de fondo si lo estás usando

const ForgotPasswordForm = () => {
  return (
    <div className="column is-one-third">
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
          <div className="control">
            <Link to="/login" className="button is-Link">
              Back to Login
            </Link>
          </div>
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
