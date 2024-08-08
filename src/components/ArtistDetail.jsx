import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ArtistDetail = ({ artistId }) => {
  const [artistDetails, setArtistDetails] = useState(null);
  const [songDetails, setSongDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArtistDetails(artistId);
  }, [artistId]);

  const fetchArtistDetails = async (id) => {
    try {
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/song-artists/${id}/`
      );
      const data = await response.json();
      setArtistDetails(data);
      fetchSongDetails(data.song);
    } catch (error) {
      setError(error);
      console.error("Error fetching artist details:", error);
      setLoading(false);
    }
  };

  const fetchSongDetails = async (songId) => {
    try {
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/songs/${songId}/`
      );
      const data = await response.json();
      setSongDetails(data);
    } catch (error) {
      setError(error);
      console.error("Error fetching song details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading artist details...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error loading artist details: {error.message}
      </p>
    );
  }

  return (
    <div className="bg-white bg-opacity-75 shadow-md rounded-lg p-4">
      {artistDetails && (
        <>
          <p className="text-lg font-semibold mb-2">
            <strong>Role:</strong> {artistDetails.role}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            <strong>Artist Name:</strong>{" "}
            {artistDetails.artist_name ? artistDetails.artist_name : "Unknown"}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Owner:</strong> {artistDetails.owner}
          </p>
        </>
      )}
      {songDetails && (
        <>
          <p className="text-sm text-gray-700">
            <strong>Song:</strong> {songDetails.title}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Year:</strong> {songDetails.year}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Duration:</strong> {Math.floor(songDetails.duration / 60)}:
            {songDetails.duration % 60}
          </p>
        </>
      )}
    </div>
  );
};

ArtistDetail.propTypes = {
  artistId: PropTypes.number.isRequired,
};

export default ArtistDetail;
