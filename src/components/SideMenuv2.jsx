import React, { useState } from 'react';
import { useLocation, Link} from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import "../Style.css";


const data = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome/>,
        className: "nav-text",
        gap: true
    },
    {
        title: "News",
        path: "/news",
        icon: <AiIcons.AiFillHome/>,
        className: "nav-text",
        gap: true
    },
    {
        title: "Ne",
        path: "/ne",
        icon: <AiIcons.AiFillHome/>,
        className: "nav-text",
        gap: true
    }
]

function SideMenu() {

    const location = useLocation();
    {
        ("useLocation: Obtiene la ubicación actual de la ruta. Esto permite saber cuál es la ruta activa en el navegador.");
    }

    const [sidemenu, setSidemenu] = useState(true);    //hook para cambiar el estado del menú lateral
    const openSideMenu = () => setSidemenu(!sidemenu);

  return (

    <div className="flex">
          <div className={` ${sidemenu ? "w-72" : "w-20 "} bg-dark-purple h-screen p-5  pt-8 relative duration-300`}>
              <button className="absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2" onClick={openSideMenu}>
                <FaIcons.FaBars/>
              </button>    
              <ul className="pt-6">
                  {data.map((item, index) => (
                      <li
                        key={index}
                        className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                        ${item.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} `}>
                        <Link to={item.path}>
                            {item.icon}
                            <span className={`${!sidemenu && "hidden"} origin-left duration-200`}>
                                {item.title}
                            </span>
                        </Link>
                      </li>
                  ))}
              </ul>
          </div>
          <div className="h-screen flex-1 p-7">
              <h1 className="text-2xl font-semibold ">Home Page</h1>
          </div>
    </div>

  );
};

export default SideMenu;
