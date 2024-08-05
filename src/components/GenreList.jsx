import { useState, useEffect } from "react";
import GenreCard from "./GenreCard";
import GenreDetail from "./GenreDetail";
// import "bulma/css/bulma.min.css";

const GenresList = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://sandbox.academiadevelopers.com/harmonyhub/genres/"
        );
        const data = await response.json();
        // Acceder a la propiedad results
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

  return (
    <div className="flex flex-col content-center">
      <h1 className="flex title text-center">Music Genres</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="grid grid-cols-2 gap-4 col-span-2 h-screen overflow-y-auto overflow-x-auto">
          {" "}
          {/* Ajustar el tamaño de la columna */}
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
        <div className="grid grid-cols-1 gap-4 col-span-1 h-screen overflow-y-auto overflow-x-auto">
          {" "}
          {/* Ajustar el tamaño de la columna */}
          <GenreDetail genreId={selectedGenreId} />
        </div>
      </div>
    </div>
  );
};


export default GenresList;
