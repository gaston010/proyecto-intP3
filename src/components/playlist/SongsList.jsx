import useSongsList from "../hooks/useSongsList";
import useFetch from "../hooks/useFetch";
import { useState, useEffect, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

import { SongsListContext } from "../../context/SongsListContext";
import { MediaContext } from "../../context/MediaContext";

export const SongCardContext = createContext();

// const SongList = ({ songIds }) => {
export const SongsList = () => {
    // const [songs, setSongs] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const [next, setNext] = useState(null);
    // const [previous, setPrevious] = useState(null);

    
    const { setCurrPage, setLoading, setNextPage, setPrevPage} = useContext(SongsListContext);
    const setMediaFileList = useContext(MediaContext);
    const [url, setUrl] = useState('http://sandbox.academiadevelopers.com/harmonyhub/songs/?page=1');
    //Permite determinar si es necesario actualizar el contexto con una nueva lista de reproducción
    const [newContext, setNewContext] = useState(true);
    const [isSameList, setIsSameList] = useState(true);
    const {data, isError, isLoading,} = useFetch(url);

    // const [result, setResult] = useState(null);
    // const result = useFetch(url);

    // useEffect(() => {
    //   // fetchSongs(
    //   //   'http://sandbox.academiadevelopers.com/harmonyhub/songs/?page=1'
    //   // );

    //   setResult(useFetch('http://sandbox.academiadevelopers.com/harmonyhub/songs/?page=1'));
    // }, []);

  //Sólo actualizar el contexto de lista de reproducción cuando se detecte que
  //ha cambiado la lista en pantalla y se halla reproducido una canción de dicha lista
  // useEffect(() => {
  //   setMediaFileList(data.results);
  // }, [newContext]);

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

  // if (data.loading) {
  //   return <p>Loading songs...</p>;
  // }

  // if (!data.currPage) {
  //   return <p>Error loading songs...</p>;
  // }

  const handleNext = () => {
    setUrl(data.next);
    setIsSameList(false);
  }
  const handlePrevious = () => {
    if (!data.prevPage) {
      setUrl(data.previous);
    } else {
      // setUrl();
    }
    setIsSameList(false);
  }

  return (
    
    <div>
      {isLoading && (<p>Loading songs...</p>)}
      {isError && <p>Error fetching songs...</p>}
        <div className="song-action-buttons">
          <button onClick={handlePrevious}>⏮️</button>
          <button onClick={handleNext}>⏭️</button>
        </div>
      <div className="song-grid">
        {data.results.map((song) => (
            <SongCardContext.Provider value={{isSameList, setNewContext}}>
                <SongCard key={song.id} song={song} />
            </SongCardContext.Provider>
          
        ))}
      </div>
    </div>
  );
};