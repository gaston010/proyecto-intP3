// src/components/ThemeToggle.js
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import CircumIcon from "@klarr-agency/circum-icons-react"

const ThemeToggle = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle d-flex align-items-center fixed top-2 right-2">
      <label className="switch">
          <div onClick={toggleTheme} className="toggle-input">
            {darkTheme ? <CircumIcon name="dark" /> : <CircumIcon name="sun" />}
          </div>
        {/* <input
          type="checkbox"
          checked={darkTheme}
          onChange={toggleTheme}
          className="toggle-input"
        >
        </input> */}
        <span className="slider round"></span>
      </label>
      {/* <p className="px-2">{darkTheme ? "Dark Theme" : "Light Theme"}</p> */}
    </div>
  );
};

export default ThemeToggle;