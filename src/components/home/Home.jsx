import { useState, useEffect } from "react";
import Bubble from "./Bubble";

const images = [
    {src: "/src/assets/bass.gif"},
    {src: "/src/assets/guitar.gif"},
    {src: "/src/assets/piano.gif"}
];

function Home() {

  return (
    <div className="flex flex-col justify-around content-around">
      <div className="flex flex-col items-center">
        <span className="text-6xl">
          Welcome to the MusicApp!
        </span>
        <span className="text-4xl">
          Please login
        </span>
      </div>
      <div className="flex justify-between"> 
        {images.map((item, index) => (
          <Bubble key={index} data={item} />
        ))}
      </div>
    </div>
    
  );
}

export default Home;
