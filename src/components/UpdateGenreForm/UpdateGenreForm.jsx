import PropTypes from "prop-types";
import useUpdateGenre from "../hooks/useUpdateGenre";
import "./UpdateGenreForm.css";

const UpdateGenreForm = ({ genre, onGenreUpdated }) => {
  const { name, setName, description, setDescription, error, handleSubmit } =
    useUpdateGenre(genre, onGenreUpdated);

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Genre Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength="100"
            minLength="1"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="1000"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">
            Update Genre
          </button>
        </div>
      </div>
      {error && <div className="notification is-danger">{error}</div>}
    </form>
  );
};

UpdateGenreForm.propTypes = {
  genre: PropTypes.object.isRequired,
  onGenreUpdated: PropTypes.func.isRequired,
};

export default UpdateGenreForm;
