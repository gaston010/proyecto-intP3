import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { MediaContext } from '../context/MediaContext';
import { ThemeContext } from '../context/ThemeContext';

// const SongList = ({ songIds }) => {
const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);


  useEffect(() => {
    fetchSongs(
      'http://sandbox.academiadevelopers.com/harmonyhub/songs/?page=1'
    );
  }, []);

  const fetchSongs = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSongs(data.results);
      setNext(data.next);
      setPrevious(data.previous);
    } catch (error) {
      setError(error);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading songs...</p>;
  }

  if (error) {
    return <p>Error loading songs: {error}</p>;
  }

  const handleNext = () => {
    fetchSongs(next);
  }
  const handlePrevious = () => {
    if (!previous) {
      fetchSongs('http://sandbox.academiadevelopers.com/harmonyhub/songs/?page=1');
    } else {
      fetchSongs(previous);
    }
  }

  return (
    <div>
        <div className="song-action-buttons">
          <button onClick={handlePrevious}>⏮️</button>
          <button onClick={handleNext}>⏭️</button>
        </div>
      <div className="song-grid">
        
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

const SongCard = ({ song }) => {
  const { title, year, duration, song_file, view_count } = song;
  const [showPlayButton, setShowPlayButton] = useState(false);
  const { setMediaFile, setTitle, setDuration } = useContext(MediaContext);
  const { darkTheme } = useContext(ThemeContext);


  const handlePlayClick = () => {
    setMediaFile(song_file);
    setTitle(title);
    setDuration(duration);
  };

  return (
    <div style={{display: 'flex', gap: '10px'}}>
      <div
        className={` ${darkTheme ? 'dark-theme song-card-dark' : 'light-theme song-card-light'}`}
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
        {year && <p>Año: {year}</p>}
        {duration && <p>Duración: {duration} segundos</p>}
        <p>Vistas:{view_count}</p>
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

export default SongList;