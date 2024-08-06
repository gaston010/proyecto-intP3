import PropTypes from "prop-types";
import "bulma/css/bulma.min.css";
import "../Style.css";

const GenreCard = ({ genre, onClick, onEdit }) => {
  return (
    <div className="column is-half">
      <div className="card" onClick={onClick}>
        <div className="card-content card-content-genre">
          <p className="title is-4 has-text-centered">{genre.name}</p>
          <p className="subtitle is-5 has-text-centered">{genre.description}</p>
          <button className="button is-link is-fullwidth">View Details</button>
          <button
            className="button is-info is-fullwidth"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click event from bubbling up
              onEdit(genre);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

GenreCard.propTypes = {
  genre: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default GenreCard;
