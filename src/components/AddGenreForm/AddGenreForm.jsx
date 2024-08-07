import PropTypes from "prop-types";
import "./AddGenreForm.css"; // Import the CSS file
import useAddGenre from "../hooks/AddGenreForm";

const AddGenreForm = ({ addGenreToList }) => {
  const {
    name,
    setName,
    description,
    setDescription,
    error,
    success,
    handleSubmit,
  } = useAddGenre(addGenreToList);

  return (
    <div className="add-genre-form box">
      <h2 className="title is-4">Add New Genre</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Genre name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-primary">
              Create Genre
            </button>
          </div>
        </div>
      </form>
      {error && <div className="notification is-danger">{error}</div>}
      {success && <div className="notification is-success">{success}</div>}
    </div>
  );
};

AddGenreForm.propTypes = {
  addGenreToList: PropTypes.func.isRequired,
};

export default AddGenreForm;
