import React from "react";

// 
const Bubble = ({data}) => {
  
  return (
    <div className="rounded-full size-52 transition ease-in-out delay-150 bg-blue-500
            hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300
            bg-cover bg-center"
            style={{backgroundImage: `url(${data.src})`}}>
    </div>
        
  );
};

export default Bubble;