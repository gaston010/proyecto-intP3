import { useState, useEffect } from "react";
import GenreCard from "./GenreCard";
import GenreDetail from "./GenreDetail";
import AddGenreForm from "./AddGenreForm";
import "bulma/css/bulma.min.css";

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  const addGenreToList = (newGenre) => {
    setGenres((prevGenres) => [...prevGenres, newGenre]);
    setShowForm(false);
  };

  return (
    <div className="container">
      <h1 className="title">Music Genres</h1>
      <div className="columns">
        <div className="column is-two-thirds">
          <div className="columns is-multiline">
            {genres.map((genre) => (
              <GenreCard
                key={genre.id}
                genre={genre}
                onClick={() => handleGenreClick(genre.id)}
              />
            ))}
          </div>
        </div>
        <div className="column is-one-third">
          <GenreDetail genreId={selectedGenreId} />
          <button
            className="button is-primary is-fullwidth"
            onClick={() => setShowForm(!showForm)}
          >
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>Add New Genre</span>
          </button>
          {showForm && <AddGenreForm addGenreToList={addGenreToList} />}
        </div>
      </div>
    </div>
  );
};

export default GenreList;
