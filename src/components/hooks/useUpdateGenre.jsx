import { useState } from "react";
import Cookies from "js-cookie";

const useUpdateGenre = (initialGenre, onGenreUpdated) => {
  const [name, setName] = useState(initialGenre.name);
  const [description, setDescription] = useState(
    initialGenre.description || ""
  );
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedGenre = { name, description };
    const token = Cookies.get("authToken");

    if (!token) {
      console.error("No token found. Please log in.");
      setError("No token found. Please log in.");
      return;
    }

    try {
      const url =
        "https://sandbox.academiadevelopers.com/harmonyhub/genres/" +
        initialGenre.id +
        "/";
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        body: JSON.stringify(updatedGenre),
      });

      if (response.ok) {
        const updatedGenreData = await response.json();
        onGenreUpdated(updatedGenreData);
        console.log("Genre updated successfully");
      } else {
        const errorData = await response.json();
        if (
          errorData.detail &&
          errorData.detail ===
            "You do not have permission to perform this action."
        ) {
          setError(
            "No tienes permiso para editar este género. Solo el propietario puede editarlo."
          );
        } else {
          setError(errorData.detail || "Error updating genre");
        }
        console.error("Error updating genre:", errorData);
      }
    } catch (error) {
      console.error("Error updating genre:", error);
      setError("Error updating genre. Please try again later.");
    }
  };

  return {
    name,
    setName,
    description,
    setDescription,
    error,
    handleSubmit,
  };
};

export default useUpdateGenre;
