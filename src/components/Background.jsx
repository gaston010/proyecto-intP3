// import React from "react";
import PropTypes from "prop-types";
import backgroundImage from "/src/assets/background-login.webp";

const Background = ({ children }) => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw", // Usa 100% del ancho de la ventana
    height: "100vh", // Usa 100% de la altura de la ventana
    overflow: "hidden", // Evita desbordamientos
  };

  return <div style={backgroundStyle}>{children}</div>;
};

// Define PropTypes
Background.propTypes = {
  children: PropTypes.node.isRequired, // PropTypes.node asegura que children pueda ser cualquier nodo de React
};

export default Background;
