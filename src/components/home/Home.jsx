import { useEffect } from "react";
import { Link } from "react-router-dom";
import Bubble from "./Bubble";
import { IoIosLogIn } from "react-icons/io";

import useRandomBubbleData from "../hooks/useRandomBubbleData.js";

function Home() {
  const [content, shuffleContent] = useRandomBubbleData();

  const imagesTop = content.slice(4, 8);
  const imagesBottom = content.slice(0, 4);

  useEffect(() => {
    const interval = setInterval(() => {
      shuffleContent();
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
        <Link to="/login" className={`button is-primary blink`}>
          <span>Login</span>
          <span className="icon">
            <IoIosLogIn />
          </span>
        </Link>
      </div>
      <div className="flex justify-around">
        {imagesBottom.map((item, index) => (
          <Bubble key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
