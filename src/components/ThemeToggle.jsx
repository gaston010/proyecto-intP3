import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import CircumIcon from "@klarr-agency/circum-icons-react";

const ThemeToggle = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle d-flex align-items-center fixed top-2 right-2">
      <label className="switch">
        <div onClick={toggleTheme} className="toggle-input">
          {darkTheme ? <CircumIcon name="dark" /> : <CircumIcon name="sun" />}
        </div>

        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
