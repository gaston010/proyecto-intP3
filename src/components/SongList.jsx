import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "bulma/css/bulma.min.css";

const SongList = ({ songIds }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songDetailsPromises = songIds.map((id) =>
          fetch(
            `https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}/`
          ).then((response) => response.json())
        );
        const songDetails = await Promise.all(songDetailsPromises);

        setSongs(songDetails);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [songIds]);

  if (loading) {
    return <p>Loading songs...</p>;
  }

  if (error) {
    return <p>Error loading songs: {error.message}</p>;
  }

  return (
    <div>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <p>
              <strong>{song.title}</strong>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

SongList.propTypes = {
  songIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SongList;
