import { useState } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import "../styles/AddGenreForm.css"; // Import the CSS file

const AddGenreForm = ({ addGenreToList }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get the authentication token from the cookie
        const token = Cookies.get("authToken");

        // Prepare the payload for the API
        const payload = {
            name,
            description,
        };

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
                addGenreToList(newGenre); // Call the function to update the list
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

    return (
        <div className="add-genre-form box">
            <h2 className="title is-4">Add New Genre</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Genre name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary">
                            Create Genre
                        </button>
                    </div>
                </div>
            </form>
            {error && <div className="notification is-danger">{error}</div>}
            {success && <div className="notification is-success">{success}</div>}
        </div>
    );
};

AddGenreForm.propTypes = {
    addGenreToList: PropTypes.func.isRequired,
};

export default AddGenreForm;