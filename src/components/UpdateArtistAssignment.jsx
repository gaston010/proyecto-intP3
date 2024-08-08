import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UpdateArtistAssignment = ({ artistAssignmentId, token }) => {
  const [formData, setFormData] = useState({
    role: "",
    song: "",
    artist: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchArtistAssignmentDetails(artistAssignmentId);
  }, [artistAssignmentId]);

  const fetchArtistAssignmentDetails = async (id) => {
    try {
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/song-artists/${id}/`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      const data = await response.json();
      setFormData({
        role: data.role,
        song: data.song,
        artist: data.artist,
      });
    } catch (error) {
      setError("Error fetching artist assignment details");
      console.error("Error fetching artist assignment details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/song-artists/${artistAssignmentId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData); // Add debugging information
        throw new Error(
          errorData.detail || "Failed to update artist assignment"
        );
      }

      setSuccess(true);
    } catch (error) {
      setError(error.message || "Error updating artist assignment");
      console.error("Error updating artist assignment:", error); // Add debugging information
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-75 shadow-md rounded-lg p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Update Artist Assignment</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && (
        <p className="text-green-500 mb-4">
          Artist assignment updated successfully
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="role">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="song">
            Song ID
          </label>
          <input
            type="number"
            id="song"
            name="song"
            value={formData.song}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="artist">
            Artist ID
          </label>
          <input
            type="number"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

UpdateArtistAssignment.propTypes = {
  artistAssignmentId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

export default UpdateArtistAssignment;
