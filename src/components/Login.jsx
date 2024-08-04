import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { IoKey } from "react-icons/io5";
import Cookies from "js-cookie";
import "../Style.css";

const LoginForm = () => {
  // State to manage form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the payload for the API
    const payload = {
      username,
      password,
    };

    try {
      // Make API request (replace with your actual API endpoint)
      const response = await fetch(
        "https://sandbox.academiadevelopers.com/api-auth/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Store the token in a cookie to future requests
        Cookies.set('authToken', token); 
        navigate("/news");  

        // Redirect or perform other actions
        console.log('Login successful');
      }

    } catch (err) {
      console.log("An error occurred:", err);
      setError(err);
      // Show error message to user
    }
  };

  return (
    <div className="column is-one-third">
      <form onSubmit={handleSubmit}>
        <div className="box has-background-transparent">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <button type="submit" className="button is-primary">
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
        {error && <div className="notification is-danger">{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
