import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ArtistCard = ({ artist }) => {
  const [songDetails, setSongDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSongDetails(artist.song);
  }, [artist.song]);

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
    return <p className="text-center text-gray-500">Loading song details...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error loading song details: {error.message}
      </p>
    );
  }

  return (
    <div className="container">
      <p className="text-lg font-semibold mb-2">
        <strong>Role:</strong> {artist.role}
      </p>
      <p className="text-sm text-white-700 mb-4">
        <strong>Artist Name:</strong>{" "}
        {artist.artist_name ? artist.artist_name : "Unknown"}
      </p>
      {songDetails && (
        <>
          <p className="text-sm text-white-700">
            <strong>Song:</strong> {songDetails.title}
          </p>
          <p className="text-sm text-white-700">
            <strong>Year:</strong> {songDetails.year}
          </p>
          <p className="text-sm text-white-700">
            <strong>Duration:</strong> {Math.floor(songDetails.duration / 60)}:
            {songDetails.duration % 60}
          </p>
        </>
      )}
    </div>
  );
};

ArtistCard.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    song: PropTypes.number.isRequired,
    artist: PropTypes.number.isRequired,
    owner: PropTypes.number,
    artist_name: PropTypes.string.isRequired, // Agregado para nombre del artista
  }).isRequired,
};

export default ArtistCard;
