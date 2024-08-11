import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from "prop-types";
import { MediaContext } from "../context/MediaContext";
// import songImage from "../assets/song.png";
import "bulma/css/bulma.min.css";

import SongCard from "./playlist/SongCard";
import CircumIcon from "@klarr-agency/circum-icons-react";

// export const SongCardContext = createContext();

export const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  const {newContext, setMediaFileList, setIsSameList, setNewContext} = useContext(MediaContext);
  
  useEffect(() => {
    fetchSongs(
      "https://sandbox.academiadevelopers.com/harmonyhub/songs/?page=1"
    );
  }, []);

  const fetchSongs = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const songNotNull = data.results.filter(song => song.song_file);
      setSongs(songNotNull);
      setNext(data.next);
      setPrevious(data.previous);
      // setLength(songs.length)
      

      if(newContext){
        setMediaFileList(songNotNull);

      }
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (newContext) {
      setMediaFileList(songs);
      setNewContext(false);
    }
  }, [newContext]);

  if (loading) {
    return <p>Loading songs...</p>;
  }

  if (error) {
    return <p>Error loading songs: {error}</p>;
  }

  const handleNext = () => {
    const endpoint = next.replace("http:", "https:");
    fetchSongs(endpoint);
    setIsSameList(false);
  };
  const handlePrevious = () => {
    if (!previous) {
      fetchSongs(
        "https://sandbox.academiadevelopers.com/harmonyhub/songs/?page=1"
      );
    } else {
      const endpoint = previous.replace("http:", "https:");
      fetchSongs(endpoint);
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
