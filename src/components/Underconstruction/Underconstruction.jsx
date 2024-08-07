// import Rfrom "react";
import { Link } from "react-router-dom";
import useRandomImage from "../hooks/useRandomImage";
import styles from "./Underconstruction.module.css";

function Underconstruction() {
  const image = useRandomImage();

  return (
    <div className={styles.container}>
      <img src={image} alt="Under Construction" className={styles.image} />
      <div className={styles.textContainer}>
        <h1 className={styles.text}>We are currently under construction!</h1>
        <Link to="/" className={styles.link}>
          <button className={styles.button}>Go to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Underconstruction;
