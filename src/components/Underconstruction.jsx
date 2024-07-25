import constructionImage from "../assets/underweb.jpeg";
import constructionImage2 from "../assets/underweb2.jpeg";
import constructionImage3 from "../assets/underweb3.jpeg";

// Ajusta la ruta según sea necesario
import { Link } from "react-router-dom";

const images = [constructionImage, constructionImage2, constructionImage3];

function getRandomImage() {
  // Selecciona un índice aleatorio
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}
function Underconstruction() {

  const image = getRandomImage();

  return (
    <div style={styles.container}>
      <img
        src={constructionImage}
        alt="Under Construction"
        style={styles.image}
      />
      <div style={styles.textContainer}>
        <h1 style={styles.text}>We are currently under construction!</h1>
        <Link to="/" style={styles.link}>
          <button style={styles.button}>Go to Home</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover", // Esto hace que la imagen cubra el área sin distorsionarse
    zIndex: -1, // Asegura que la imagen esté detrás del texto
  },
  text: {
    position: "relative",
    zIndex: 1, // Asegura que el texto esté por encima de la imagen
    color: "#F32", // Ajusta el color del texto según sea necesario
    fontSize: "24px",
  },
};

export default Underconstruction;
