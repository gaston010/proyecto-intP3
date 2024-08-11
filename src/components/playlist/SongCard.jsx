import useSong from "../hooks/useSong";
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { MediaContext } from "../../context/MediaContext";
// import { SongCardContext } from "./SongsList";

const SongCard = ({ song, index }) => {
    const { title, year, duration, view_count, song_file } = song;
    const [showPlayButton, setShowPlayButton] = useState(false);
    const { setMediaFile, setTitle, setDuration, setPrev, setNext, isSameList, setIsSameList, setNewContext, length} = useContext(MediaContext); 
  
    const handlePlayClick = () => {
    //Si la lista de canciones en la pantalla cambió, entonces deberá notificarse
    //al componente SongsList que debe actualizar el SongListContext.
        !isSameList ? setNewContext(true): setIsSameList(true);
        setMediaFile(song_file);
        setTitle(title);
        setDuration(duration);
        setPrev(index);
        if(index+1 === length){
            setNext(0);
        }
        else {
            setNext(index+1);
        }
    };
  
    return (
      <div style={{display: 'flex', gap: '10px'}}>
        <div
          className="song-card"
          onMouseEnter={() => setShowPlayButton(true)}
          onMouseLeave={() => setShowPlayButton(false)}
        >
          {showPlayButton && (
            <button className="play-button" onClick={handlePlayClick}>
              ▶️
            </button>
          )}
          {/* <h2>{title}</h2> */}
          {/* {year && <p><strong>Año:</strong> {year}</p>}
          {duration && <p><strong>Duración:</strong> {duration} segundos</p>}
          {song_file && (
            <p>
              <strong>Archivo:</strong> <a href={song_file} target="_blank" rel="noopener noreferrer">Escuchar</a>
            </p>
          )}
          <p><strong>Vistas:</strong> {view_count}</p> */}
        </div>
        <div>
          <h2>{title}</h2>
          {year && <p><strong>Año:</strong> {year}</p>}
          {duration && <p><strong>Duración:</strong> {duration} segundos</p>}
          <p><strong>Vistas:</strong> {view_count}</p>
        </div>
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
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      album: PropTypes.number,
      owner: PropTypes.number.isRequired,
      artists: PropTypes.array.isRequired,
      genres: PropTypes.array.isRequired
    }).isRequired
  };
  
  export default SongCard;