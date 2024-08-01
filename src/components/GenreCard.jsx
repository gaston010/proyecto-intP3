// import React from "react";
import PropTypes from "prop-types";
import "bulma/css/bulma.min.css";
import "../Style.css";

const GenreCard = ({ genre, onClick }) => {
  return (
    <div className="column is-half">
      {" "}
      {/* Ajustar el tamaño de la columna */}
      <div className="card" onClick={onClick}>
        <div className="card-content card-content-genre">
          <p className="title is-4 has-text-centered">
            {" "}
            {/* Ajustar el tamaño de la fuente */}
            {genre.name}
          </p>
          <p className="subtitle is-5 has-text-centered">
            {" "}
            {/* Ajustar el tamaño de la fuente */}
            {genre.description}
          </p>
          <button className="button is-link is-fullwidth">View Details</button>
        </div>
      </div>
    </div>
  );
};
GenreCard.propTypes = {
  genre: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GenreCard;
