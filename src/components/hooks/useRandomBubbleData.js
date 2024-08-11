import { useState } from "react";
import bass from "../../assets/bass.gif"
import speaker from "../../assets/speaker.gif"
import piano from "../../assets/piano.gif"
import drums from "../../assets/drums.gif"
import eguitar from "../../assets/eguitar.gif"
import saxo from "../../assets/saxo.gif"
import chelo from "../../assets/chelo.gif"
import guitar from "../../assets/guitar.gif"

//Crear un Hook para generar dos listas de objetos 
//con src y delay aleatorios.

const sourceList = [
  {src: bass, delay: 2000},
  {src: speaker, delay: 0},
  {src: piano, delay: 2000},
  {src: drums, delay: 0},
  {src: eguitar, delay: 0},
  {src: saxo, delay: 2000},
  {src: chelo, delay: 0},
  {src: guitar, delay: 2000}
];

//Custom Hook to shuffle the content to be placed on each Bubble component
const useRandomBubbleData = () => {
  
  const [content, setContent] = useState(sourceList);
  
  const shuffleContent = () => {
    let ran;
    const sources  = content.map((item) => item.src);
    const times  = content.map((item) => item.delay);
    let shuffled = [];
    do{
      ran = Math.floor(Math.random() * sources.length);
      shuffled.push({
        src: sources[ran],
        delay: times.shift()
      });
      sources.splice(ran, 1);
    }while(sources.length);
    setContent(shuffled);
  }
  return [content, shuffleContent];
}

export default useRandomBubbleData;