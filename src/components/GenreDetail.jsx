import { useState, useEffect } from "react";
import SongList from "./SongList";
import PropTypes from "prop-types";
import "bulma/css/bulma.min.css";

const GenreDetail = ({ genreId }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenreDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://sandbox.academiadevelopers.com/harmonyhub/genres/${genreId}/`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (genreId) {
      fetchGenreDetails();
    }
  }, [genreId]);

  if (!genreId) {
    return <p>Select a genre to see songs</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching songs: {error.message}</p>;
  }

  if (!details || details.songs.length === 0) {
    return <p>No songs available for this genre</p>;
  }

  return (
    <div className="box">
      <h2 className="title">Songs</h2>
      <SongList songIds={details.songs} />
    </div>
  );
};
GenreDetail.propTypes = {
  genreId: PropTypes.string,
};

export default GenreDetail;
