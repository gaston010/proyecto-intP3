import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { MediaContext } from "../../context/MediaContext";
import defaultImage from "../../assets/song.png"; // Asegúrate de que la ruta sea correcta
import { FaPlay } from "react-icons/fa"; // Asegúrate de instalar react-icons si aún no lo has hecho

const SongCard = ({ song }) => {
  const { title, year, duration, song_file, view_count, cover } = song;
  const [showPlayButton, setShowPlayButton] = useState(false);
  const { setMediaFile, setTitle, setDuration } = useContext(MediaContext);

  const handlePlayClick = () => {
    setMediaFile(song_file);
    setTitle(title);
    setDuration(duration);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-gray-800 rounded-lg shadow-lg">
      <div
        className="relative w-32 h-32 overflow-hidden rounded-lg"
        onMouseEnter={() => setShowPlayButton(true)}
        onMouseLeave={() => setShowPlayButton(false)}
      >
        <img
          src={cover || defaultImage}
          alt={title}
          className="object-cover w-full h-full"
        />
        {showPlayButton && (
          <button
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl rounded-full hover:bg-opacity-75 transition-opacity duration-300"
            onClick={handlePlayClick}
          >
            <FaPlay />
          </button>
        )}
      </div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {year && (
        <p className="text-sm text-gray-300">
          <strong>Año:</strong> {year}
        </p>
      )}
      {duration && (
        <p className="text-sm text-gray-300">
          <strong>Duración:</strong> {duration} segundos
        </p>
      )}
      <p className="text-sm text-gray-300">
        <strong>Vistas:</strong> {view_count}
      </p>
    </div>
  );
};

SongCard.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number,
    duration: PropTypes.number,
    song_file: PropTypes.string,
    view_count: PropTypes.number.isRequired,
    cover: PropTypes.string, // Añadido para la imagen de la canción
  }).isRequired,
};

export default SongCard;
