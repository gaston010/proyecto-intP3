import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

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

        Cookies.set("authToken", token);
        navigate("/news");

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

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};

export default useAuth;
