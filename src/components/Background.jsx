// import React from "react";
import PropTypes from "prop-types";
import backgroundImage from "/src/assets/background-home.jpg";

const Background = ({ children }) => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: '-webkit-fill-available'
  };

  return <div style={backgroundStyle}>{children}</div>;
};

// Define PropTypes
Background.propTypes = {
  children: PropTypes.node.isRequired, // PropTypes.node asegura que children pueda ser cualquier nodo de React
};

export default Background;
