import { useState, useEffect } from "react";
import Bubble from "./Bubble";
import { IoGitMerge } from "react-icons/io5";

//Crear un Hook para generar dos listas de objetos 
//con src y delay aleatorios.

// const sourceList = [
//   {src: "/src/assets/bass.gif", delay: 2000},
//   {src: "/src/assets/speaker.gif", delay: 3000},
//   {src: "/src/assets/piano.gif", delay: 500},
//   {src: "/src/assets/drums.gif", delay: 1000},
//   {src: "/src/assets/eguitar.gif", delay: 4000},
//   {src: "/src/assets/saxo.gif", delay: 3500},
//   {src: "/src/assets/chelo.gif", delay: 1000},
//   {src: "/src/assets/guitar.gif", delay: 2000}
// ];

const sourceList = [
  {src: "/src/assets/bass.gif", delay: 5000},
  {src: "/src/assets/speaker.gif", delay: 1000},
  {src: "/src/assets/piano.gif", delay: 7000},
  {src: "/src/assets/drums.gif", delay: 3000},

  {src: "/src/assets/eguitar.gif", delay: 0},
  {src: "/src/assets/saxo.gif", delay: 6000},
  {src: "/src/assets/chelo.gif", delay: 2000},
  {src: "/src/assets/guitar.gif", delay: 4000}
];

//Custom Hook to shuffle the content to be placed on each Bubble component
const useRandomBubbleData = () => {
  
  const [content, setContent] = useState(sourceList);
  
  const shuffleContent = () => {
    let ran1, ran2;
    const source  = content.map((item) => item.src);
    const time    = content.map((item) => item.delay);
    let shuffled = [];
    do{
      ran1 = Math.floor(Math.random() * source.length);
      ran2 = Math.floor(Math.random() * time.length);
      shuffled.push({
        src: source[ran1],
        delay: time[ran2]
      });
      source.splice(ran1, 1);
      time.splice(ran2, 1);
    }while(source.length);
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

  // const [content, shuffleContent] = useRandomBubbleData();
  
  // const imagesTop = content.slice(4,8);
  // const imagesBottom = content.slice(0,4);

  const imagesTop = sourceList.slice(4,8);
  const imagesBottom = sourceList.slice(0,4);

//   useEffect(() => {
//     const interval = setInterval(() => {
//           shuffleContent()
//         }, 2000);
//     return () => {
//         clearInterval(interval);
//     };
//     // const interval = setInterval(() => {
//     //         toggleTransition()
//     //     }, 2000);
//     //     return () => {
//     //         clearInterval(interval);
//     // };
// }, [imagesTop]);

  return (
    <div className="flex flex-auto flex-col space-y-5">
      <div className="flex justify-around"> 
        {imagesTop.map((item, index) => (
          <Bubble key={index} data={item} />
        ))}
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-6xl">
          Welcome to the MusicApp!
        </span>
        <span className="text-4xl">
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
