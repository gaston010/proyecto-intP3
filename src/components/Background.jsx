// import React from "react";
import PropTypes from "prop-types";
import backgroundImageWhite from "../assets/background-login-white.jpg";
import backgroundImageDark from "../assets/background-login.jpg";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Background = ({ children }) => {
  const { darkTheme } = useContext(ThemeContext);

  const backgroundStyle = {
    backgroundImage: `url(${
      darkTheme ? backgroundImageDark : backgroundImageWhite
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "-webkit-fill-available",
  };

  return (
    <div className="w-full" style={backgroundStyle}>
      {children}
    </div>
  );
};

// Define PropTypes
Background.propTypes = {
  children: PropTypes.node.isRequired, // PropTypes.node asegura que children pueda ser cualquier nodo de React
};

export default Background;
