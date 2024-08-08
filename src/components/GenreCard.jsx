import PropTypes from "prop-types";
import { useState } from "react";
import "tailwindcss/tailwind.css";

const GenreCard = ({ genre, onClick, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`w-full sm:w-1/2 lg:w-1/3 p-4 ${
        isHovered ? "transform scale-105" : "transform scale-100"
      } transition-transform duration-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(genre.id)}
      style={{ cursor: "pointer" }}
    >
      <div className="bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-bold text-center">{genre.name}</h3>
          <p className="text-gray-400 text-center">{genre.description}</p>
          {isHovered && (
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click event from bubbling up
                onEdit(genre);
              }}
            >
              Edit
            </button>
          )}
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
