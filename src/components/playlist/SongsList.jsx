import { useSongsList } from "../hooks/useSongsList";

import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { MediaContext } from '../context/MediaContext';

// const SongList = ({ songIds }) => {
const SongList = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);

    const [url, setUrl] = useState('');
    const [currPage, pervPage, nextPage] = useSongsList(url);

  useEffect(() => {
    setUrl('http://sandbox.academiadevelopers.com/harmonyhub/songs/?page=1');
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

