import { useState, useEffect } from "react";
import GenreCard from "./GenreCard";
import GenreDetail from "./GenreDetail";
import AddGenreForm from "./AddGenreForm";
import UpdateGenreForm from "./UpdateGenreForm";
import PropTypes from "prop-types";
import "tailwindcss/tailwind.css";

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGenres = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && Array.isArray(data.results)) {
        setGenres(data.results);
        setNextPageUrl(data.next);
        setPreviousPageUrl(data.previous);
      } else {
        console.error("Expected an array of genres in results");
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres("https://sandbox.academiadevelopers.com/harmonyhub/genres/");
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
    setEditingGenre(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-full mb-4">
        {previousPageUrl && (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-4"
            onClick={() => fetchGenres(previousPageUrl)}
          >
            Previous
          </button>
        )}
        <h1 className="text-2xl font-bold">Music Genres</h1>
        {nextPageUrl && (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ml-4"
            onClick={() => fetchGenres(nextPageUrl)}
          >
            Next
          </button>
        )}
      </div>
      {loading ? (
        <p>Loading Genres...</p>
      ) : (
        <div className="flex flex-wrap w-full">
          <div className="w-full lg:w-2/3 p-4">
            <div className="flex flex-wrap">
              {genres.map((genre) => (
                <GenreCard
                  key={genre.id}
                  genre={genre}
                  onClick={handleGenreClick}
                  onEdit={handleEditGenre}
                />
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/3 p-4">
            <GenreDetail genreId={selectedGenreId} />
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => setShowForm(!showForm)}
            >
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
              <span>Add New Genre</span>
            </button>
            {showForm && <AddGenreForm addGenreToList={addGenreToList} />}
            {editingGenre && (
              <UpdateGenreForm
                genre={editingGenre}
                onGenreUpdated={handleGenreUpdated}
              />
            )}
            {selectedGenreId && <SongList genreId={selectedGenreId} />}
          </div>
        </div>
      )}
    </div>
  );
};

const SongList = ({ genreId }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `https://sandbox.academiadevelopers.com/harmonyhub/genres/${genreId}/songs/`
        );
        const data = await response.json();
        setSongs(data.results.slice(0, 5)); // Limitar a 5 canciones
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    if (genreId) {
      fetchSongs();
    }
  }, [genreId]);

  return (
    <div className="mt-4">
      <div className="space-y-2">
        {songs.map((song) => (
          <div key={song.id} className="bg-gray-700 text-white p-2 rounded">
            <h3 className="text-md">{song.title}</h3>
            <p className="text-sm">Year: {song.year}</p>
            <p className="text-sm">Duration: {song.duration} segundos</p>
            <p className="text-sm">Played: {song.view_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

SongList.propTypes = {
  genreId: PropTypes.number.isRequired,
};

export default GenreList;
