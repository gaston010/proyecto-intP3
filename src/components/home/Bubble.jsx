import React, {useState, useEffect} from "react";

const delay = ms => new Promise(res => setTimeout(res, ms));
//Custom hook for changing transition effect
const transitionClasses = [
    "scale-50 opacity-0", 
    "scale-110 opacity-100"
];

const Bubble = ({data}) => {
    
    const [transition, setTransition] = useState(0);
    
    function toggleTransition() {
        setTransition(transition === 0 ? 1 : 0);
    };

    //using a hook to update transitions effects

    useEffect(() => {
        let interval;
        setTimeout(() => {
            interval = setInterval(() => {
                toggleTransition()
            }, 2000);
        }, data.delay);
        return () => {
            clearInterval(interval);
        };
        // const interval = setInterval(() => {
        //         toggleTransition()
        //     }, 2000);
        //     return () => {
        //         clearInterval(interval);
        // };
    }, [transition]);

  return (
    <div className={
        `rounded-full size-48 transition ease-in-out
         ${transitionClasses[transition]}           
        duration-500 bg-cover bg-center`}
            style={{backgroundImage: `url(${data.src})`}}>
    </div>
        
  );
};

export default Bubble;