import GenreCard from "../GenreCard/GenreCard";
import GenreDetail from "../GenreDetail/GenreDetail";
import AddGenreForm from "../AddGenreForm/AddGenreForm";
import UpdateGenreForm from "../UpdateGenreForm/UpdateGenreForm";
import useGenres from "../hooks/userGenres";
import "bulma/css/bulma.min.css";
import "./GenreList.css"; // Importar el archivo CSS si existe

const GenreList = () => {
  const {
    genres,
    selectedGenreId,
    showForm,
    editingGenre,
    setShowForm,
    handleGenreClick,
    handleEditGenre,
    addGenreToList,
    handleGenreUpdated,
  } = useGenres();

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
                onEdit={handleEditGenre}
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
          {editingGenre && (
            <UpdateGenreForm
              genre={editingGenre}
              onGenreUpdated={handleGenreUpdated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GenreList;
