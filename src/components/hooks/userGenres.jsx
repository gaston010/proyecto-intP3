import { useState, useEffect } from "react";

const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://sandbox.academiadevelopers.com/harmonyhub/genres/"
        );
        const data = await response.json();
        if (data && Array.isArray(data.results)) {
          setGenres(data.results);
        } else {
          console.error("Expected an array of genres in results");
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (id) => {
    setSelectedGenreId(id);
  };

  const handleEditGenre = (genre) => {
    setEditingGenre(genre);
  };

  const addGenreToList = (newGenre) => {
    setGenres((prevGenres) => [...prevGenres, newGenre]);
    setShowForm(false);
  };

  const handleGenreUpdated = (updatedGenre) => {
    setGenres((prevGenres) =>
      prevGenres.map((genre) =>
        genre.id === updatedGenre.id ? updatedGenre : genre
      )
    );
    setEditingGenre(null); // Reset the editing genre state
  };

  return {
    genres,
    selectedGenreId,
    showForm,
    editingGenre,
    setShowForm,
    handleGenreClick,
    handleEditGenre,
    addGenreToList,
    handleGenreUpdated,
  };
};

export default useGenres;
