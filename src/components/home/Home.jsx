import { useState, useEffect } from "react";
import Bubble from "./Bubble";
import { IoGitMerge } from "react-icons/io5";

//Crear un Hook para generar dos listas de objetos 
//con src y delay aleatorios.

const sourceList = [
  {src: "/src/assets/bass.gif", delay: 2000},
  {src: "/src/assets/speaker.gif", delay: 0},
  {src: "/src/assets/piano.gif", delay: 2000},
  {src: "/src/assets/drums.gif", delay: 0},
  {src: "/src/assets/eguitar.gif", delay: 0},
  {src: "/src/assets/saxo.gif", delay: 2000},
  {src: "/src/assets/chelo.gif", delay: 0},
  {src: "/src/assets/guitar.gif", delay: 2000}
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


// const imagesTop = [
//   {src: "/src/assets/bass.gif", delay: 2000},
//   {src: "/src/assets/speaker.gif", delay: 3000},
//   {src: "/src/assets/piano.gif", delay: 500},
//   {src: "/src/assets/drums.gif", delay: 1000}
// ];

// const imagesBottom = [
//   {src: "/src/assets/eguitar.gif", delay: 4000},
//   {src: "/src/assets/saxo.gif", delay: 3500},
//   {src: "/src/assets/chelo.gif", delay: 1000},
//   {src: "/src/assets/guitar.gif", delay: 2000}
// ];


function Home() {

  const [content, shuffleContent] = useRandomBubbleData();
  
  const imagesTop = content.slice(4,8);
  const imagesBottom = content.slice(0,4);

  useEffect(() => {
    const interval = setInterval(() => {
          shuffleContent()
        }, 4000);
    return () => {
        clearInterval(interval);
    };
}, [imagesTop]);

  return (
    <div className="flex flex-auto flex-col space-y-5">
      <div className="flex justify-around"> 
        {imagesTop.map((item, index) => (
          <Bubble key={index} data={item} />
        ))}
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-6xl text-shadow text-shadow-fuchsia-500 text-shadow-blur-5 text-shadow-x-3 text-shadow-y-1">
          Welcome to the MusicApp!
        </span>
        <span className="text-4xl text-shadow text-shadow-fuchsia-500 text-shadow-blur-5 text-shadow-x-3 text-shadow-y-1">
          Please login
        </span>
      </div>
      <div className="flex justify-around"> 
        {
          imagesBottom.map((item, index) => (
            <Bubble key={index} data={item} />
          ))
        }
      </div>
    </div>
    
  );
}

export default Home;
