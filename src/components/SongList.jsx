import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from "prop-types";
import { MediaContext } from "../context/MediaContext";
// import songImage from "../assets/song.png";
import "bulma/css/bulma.min.css";

import SongCard from "./playlist/SongCard";
import CircumIcon from "@klarr-agency/circum-icons-react"

// export const SongCardContext = createContext();

export const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  const {newContext, setMediaFileList, setIsSameList} = useContext(MediaContext);
  
  useEffect(() => {
    fetchSongs(
      "http://sandbox.academiadevelopers.com/harmonyhub/songs/?page=1"
    );
  }, []);

  const fetchSongs = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSongs(data.results);
      setNext(data.next);
      setPrevious(data.previous);
      // setLength(songs.length)
      if(newContext){
        setMediaFileList(data.results);
      }
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(newContext){
      setMediaFileList(songs);
    }
  }, [newContext])


  if (loading) {
    return <p>Loading songs...</p>;
  }

  if (error) {
    return <p>Error loading songs: {error}</p>;
  }

  const handleNext = () => {
    fetchSongs(next);
    setIsSameList(false);
  };
  const handlePrevious = () => {
    if (!previous) {
      fetchSongs(
        "http://sandbox.academiadevelopers.com/harmonyhub/songs/?page=1"
      );
    } else {
      fetchSongs(previous);
    }
    setIsSameList(false);
  };

  return (
    <div>
      <div className="song-action-buttons">
        <button onClick={handlePrevious}>
        <CircumIcon name="square_chev_left" />
        </button>
        <button onClick={handleNext}>
          <CircumIcon name="square_chev_right" />
          </button>
      </div>
      {/* <SongCardContext.Provider value={{isSameList, setNewContext, setIsSameList, length }}> */}
      <div className="song-grid">
        {songs.map((song, index) => (
            <SongCard key={song.id} index={index} song={song} />
        ))}
      </div>
      {/* </SongCardContext.Provider> */}
    </div>
  );
};

// const SongCard = ({ song }) => {
//   const { title, year, duration, song_file, view_count } = song;
//   const [showPlayButton, setShowPlayButton] = useState(false);
//   const { setMediaFile, setTitle, setDuration } = useContext(MediaContext);

//   const handlePlayClick = () => {
//     setMediaFile(song_file);
//     setTitle(title);
//     setDuration(duration);
//   };

//   // const songImage = song.image || "../asssets/song.png"; // Asegúrate de tener una ruta válida para la imagen predeterminada

//   return (
//     <div
//       className="card"
//       onMouseEnter={() => setShowPlayButton(true)}
//       onMouseLeave={() => setShowPlayButton(false)}
//     >
//       <div className="card-content">
//         {showPlayButton && (
//           <button
//             className="button is-primary is-small"
//             onClick={handlePlayClick}
//           >
//             ▶️
//           </button>
//         )}
//         <div className="media">
//           <div className="media-left">
//             <figure className="image is-48x48">
//               <img src={songImage} alt="Song icon" />
//             </figure>
//           </div>
//           <div className="media-content">
//             <p className="title is-6">{title}</p>
//             {year && <p className="subtitle is-7">Año: {year}</p>}
//             {duration && (
//               <p className="subtitle is-7">Duración: {duration} segundos</p>
//             )}
//             <p className="subtitle is-7">Vistas: {view_count}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// SongCard.propTypes = {
//   song: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     year: PropTypes.number,
//     duration: PropTypes.number,
//     song_file: PropTypes.string,
//     view_count: PropTypes.number.isRequired,
//     created_at: PropTypes.string.isRequired,
//     updated_at: PropTypes.string.isRequired,
//     album: PropTypes.number,
//     owner: PropTypes.number.isRequired,
//     artists: PropTypes.array.isRequired,
//     genres: PropTypes.array.isRequired,
//     image: PropTypes.string, // Añadir la propiedad image
//   }).isRequired,
// };

// export default SongList;