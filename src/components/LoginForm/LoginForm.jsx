import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { IoKey } from "react-icons/io5";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        Cookies.set("authToken", token);
        navigate("/news");

        // Redirect or perform other actions
        console.log("Login successful");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Error al iniciar sesión");
      }
    } catch (err) {
      console.log("An error occurred:", err);
      setError("Error de conexión. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <div className="relative">
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaUser className="text-gray-400" />
            </span>
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaLock className="text-gray-400" />
            </span>
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <input id="remember" type="checkbox" className="mr-2 leading-tight" />
          <label htmlFor="remember" className="text-gray-700">
            Remember me
          </label>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <span className="mr-2">Login</span>
            <LuLogIn />
          </button>
          <Link
            to="/forgot"
            className="flex items-center px-4 py-2 bg-blue-100 text-blue-500 rounded-md hover:bg-blue-200"
          >
            <span className="mr-2">Forgot password</span>
            <IoKey />
          </Link>
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
