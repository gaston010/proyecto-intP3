// import React from "react";
import PropTypes from "prop-types";
import SongCard from "./SongCard"; // Asegúrate de que la ruta sea correcta

const SongGrid = ({ songs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
};

SongGrid.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      year: PropTypes.number,
      duration: PropTypes.number,
      song_file: PropTypes.string,
      view_count: PropTypes.number.isRequired,
      cover: PropTypes.string,
    })
  ).isRequired,
};

export default SongGrid;
