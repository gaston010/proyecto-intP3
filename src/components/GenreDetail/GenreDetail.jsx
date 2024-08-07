// import React from "react";
import PropTypes from "prop-types";
import useGenreDetails from "../hooks/useGenreDetails";
import SongList from "../SongList/SongList"; // Ajusta la ruta según la ubicación real

const GenreDetail = ({ genreId }) => {
  const { details, loading, error } = useGenreDetails(genreId);

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
  genreId: PropTypes.number,
};

export default GenreDetail;
