import { useState } from "react";

//Crear un Hook para generar dos listas de objetos
//con src y delay aleatorios.

const sourceList = [
  { src: "../../assets/bass.gif", delay: 2000 },
  { src: "../../assets/speaker.gif", delay: 0 },
  { src: "../../assets/piano.gif", delay: 2000 },
  { src: "../../assets/drums.gif", delay: 0 },
  { src: "../../assets/eguitar.gif", delay: 0 },
  { src: "../../assets/saxo.gif", delay: 2000 },
  { src: "../../assets/chelo.gif", delay: 0 },
  { src: "../../assets/guitar.gif", delay: 2000 },
];

//Custom Hook to shuffle the content to be placed on each Bubble component
const useRandomBubbleData = () => {
  const [content, setContent] = useState(sourceList);

  const shuffleContent = () => {
    let ran;
    const sources = content.map((item) => item.src);
    const times = content.map((item) => item.delay);
    let shuffled = [];
    do {
      ran = Math.floor(Math.random() * sources.length);
      shuffled.push({
        src: sources[ran],
        delay: times.shift(),
      });
      sources.splice(ran, 1);
    } while (sources.length);
    setContent(shuffled);
  };
  return [content, shuffleContent];
};

export default useRandomBubbleData;
