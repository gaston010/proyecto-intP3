import constructionImage from "../../assets/underweb.jpeg";
import constructionImage2 from "../../assets/underweb2.jpeg";
import constructionImage3 from "../../assets/underweb3.jpeg";

const images = [constructionImage, constructionImage2, constructionImage3];

function useRandomImage() {
  // Selecciona un índice aleatorio
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

export default useRandomImage;
