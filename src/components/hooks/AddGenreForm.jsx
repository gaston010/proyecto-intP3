import { useState } from "react";
import Cookies from "js-cookie";

const useAddGenre = (addGenreToList) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = Cookies.get("authToken");

    const payload = { name, description };

    try {
      const response = await fetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/genres/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const newGenre = await response.json();
        addGenreToList(newGenre);
        setSuccess("Genre created successfully");
        setName("");
        setDescription("");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Error creating the genre");
      }
    } catch (err) {
      console.log("An error occurred:", err);
      setError("Connection error. Please try again later.");
    }
  };

  return {
    name,
    setName,
    description,
    setDescription,
    error,
    success,
    handleSubmit,
  };
};

export default useAddGenre;
