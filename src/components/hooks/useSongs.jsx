import { useState, useEffect } from "react";

const useSongs = (initialUrl) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    fetchSongs(initialUrl);
  }, [initialUrl]);

  const fetchSongs = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSongs(data.results);
      setNext(data.next);
      setPrevious(data.previous);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (next) {
      fetchSongs(next);
    }
  };

  const handlePrevious = () => {
    if (previous) {
      fetchSongs(previous);
    }
  };

  return {
    songs,
    loading,
    error,
    handleNext,
    handlePrevious,
  };
};

export default useSongs;
