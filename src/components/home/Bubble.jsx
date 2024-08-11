import { useState, useEffect } from "react";

//Custom hook for changing transition effect

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const transitionClasses = ["scale-50 opacity-0", "scale-110 opacity-100"];

const Bubble = ({ data }) => {
  const [transition, setTransition] = useState(0); //para actualizar la transisión de la animación del componente
  const [initial, setInitial] = useState(true);

  //using a react hook to update transitions effects

  useEffect(() => {
    //Se ejecuta una única vez al primer renderizado
    let interval;

    if (initial) {
      setTimeout(() => {
        interval = setInterval(
          () => setTransition(transition === 0 ? 1 : 0),
          2000
        );
      }, data.delay);
      setInitial(false);
    } else {
      interval = setInterval(
        () => setTransition(transition === 0 ? 1 : 0),
        2000
      );
    }
    return () => {
      clearInterval(interval);
    };
  }, [transition]);

  return (
    <div
      className={`rounded-full size-48 shadow-lg shadow-fuchsia-500 transition ease-in-out
         ${transitionClasses[transition]}           
        duration-500 bg-cover bg-center`}
      style={{ backgroundImage: `url(${data.src})` }}
    ></div>
  );
};

export default Bubble;
