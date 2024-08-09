import { useSongsList } from "../hooks/useSongsList";

import { useState, useEffect, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

import { MediaContext } from '../context/MediaContext';
import { SongsListContext } from "../../context/SongsListContext";

const SongCardContext = createContext();

// const SongList = ({ songIds }) => {
const SongList = () => {
    // const [songs, setSongs] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const [next, setNext] = useState(null);
    // const [previous, setPrevious] = useState(null);

    
    const { setSongs, setLoading, setError, setNextset, setPrevious} = useContext(SongsListContext);

    const [url, setUrl] = useState('');
    const data = useSongsList(url);
    //Permite determinar si es necesario actualizar el contexto con una nueva lista de reproducción
    const [newContext, setNewContext] = useState(true);
    const [isSameList, setIsSameList] = useState(true);

    

  useEffect(() => {
    setUrl('http://sandbox.academiadevelopers.com/harmonyhub/songs/?page=1');
  }, []);

  //Sólo actualizar el contexto de lista de reproducción cuando se detecte que
  //ha cambiado la lista en pantalla y se halla reproducido una canción de dicha lista
  useEffect(() => {
    setSongs(data.currPage);
    setLoading(data.loading);
    setNext(data.nextPage);
    setPrevious(data.prevPage);
  }, [newContext]);

//   const fetchSongs = async (url) => {
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setSongs(data.results);
//       setNext(data.next);
//       setPrevious(data.previous);
//     } catch (error) {
//       setError(error);
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

  if (data.loading) {
    return <p>Loading songs...</p>;
  }

  if (!data.currPage) {
    return <p>Error loading songs: {error}</p>;
  }

  const handleNext = () => {
    setUrl(data.next);
    setIsSameList(false);
  }
  const handlePrevious = () => {
    if (!data.prevPage) {
      setUrl(data.prevPage);
    } else {
      setUrl(prevPage);
    }
    setIsSameList(false);
  }

  return (
    <div>
        <div className="song-action-buttons">
          <button onClick={handlePrevious}>⏮️</button>
          <button onClick={handleNext}>⏭️</button>
        </div>
      <div className="song-grid">
        {currPage.map((song) => (
            <SongCardContext.Provider value={{isSameList, setNewContext}}>
                <SongCard key={song.id} song={song} />
            </SongCardContext.Provider>
          
        ))}
      </div>
    </div>
  );
};

