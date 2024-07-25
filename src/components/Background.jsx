// import React from "react";
import PropTypes from "prop-types";
import backgroundImage from "/src/assets/background-login.webp";

const Background = ({ children }) => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "93vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return <div style={backgroundStyle}>{children}</div>;
};

// Define PropTypes
Background.propTypes = {
  children: PropTypes.node.isRequired, // PropTypes.node asegura que children pueda ser cualquier nodo de React
};

export default Background;
