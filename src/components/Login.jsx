import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { IoKey } from "react-icons/io5";
import "../Style.css";

const LoginForm = () => {
  // State to manage form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        " /api-auth/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        console.log("Login successful:", data);

        // Store the token in the session storage to future API and use
        Cookies.set("token", data.token, { secure: true });
            // document.cookie = `token=${data.token}; secure=true;`;

        // Redirect to Home page
        navigate("/");
      } else {
        // Handle error response
        console.error("Login failed:", response.statusText);
        // Show error message to user
      }
    } catch (error) {
      console.error("An error occurred:", error);
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
      </form>
    </div>
  );
};

export default LoginForm;
