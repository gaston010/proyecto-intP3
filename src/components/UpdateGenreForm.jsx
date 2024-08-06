import { useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const UpdateGenreForm = ({ genre, onGenreUpdated }) => {
  const [name, setName] = useState(genre.name);
  const [description, setDescription] = useState(genre.description || "");
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
        genre.id +
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Genre Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength="100"
            minLength="1"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="1000"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">
            Update Genre
          </button>
        </div>
      </div>
      {error && <div className="notification is-danger">{error}</div>}
    </form>
  );
};

UpdateGenreForm.propTypes = {
  genre: PropTypes.object.isRequired,
  onGenreUpdated: PropTypes.func.isRequired,
};

export default UpdateGenreForm;
