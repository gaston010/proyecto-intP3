import React, { useState } from "react";
import { RiSettings4Line, RiLogoutBoxLine } from "react-icons/ri";
import React, { useState, useContext } from "react";
import { RiSettings4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FcNews } from "react-icons/fc";
import { CiBoxList } from "react-icons/ci";
import { GiLoveSong } from "react-icons/gi";
import { FaUserCircle, FaBars } from "react-icons/fa";
import Cookies from "js-cookie";
import CircumIcon from "@klarr-agency/circum-icons-react"
import { ThemeContext } from '../context/ThemeContext';



const homeButtons = [
  { name: "Iniciar Sesión", path: "/login", icon: FaUserCircle },
  { name: "Más escuchados", path: "/news", icon: FcNews },
  { name: "Géneros", path: "/genre", icon: CiBoxList },
  { name: "Canciones", path: "/songs", icon: GiLoveSong, margin: true },
  { name: "Setting", path: "/", icon: RiSettings4Line }
];

const menus = [
  { name: "Más escuchados", path: "/news", icon: "star" },
  { name: "Géneros", path: "/genre", icon: "view_list" },
  { name: "Canciones", path: "/songs", icon: "headphones", margin: true },
  { name: "Setting", path: "*", icon: "slider_horizontal" },
  { name: "Perfil", path: "/profile",  icon: "slider_horizontal", margin: true},
  { name: "Logout", path: "/logout",  icon: "slider_horizontal", margin: true},
];

const SideMenu = ({ toggleSideMenu, className }) => {

  const [open, setOpen] = useState(true);
  const token = Cookies.get("authToken");
  const { darkTheme } = useContext(ThemeContext);

  // if (!token) {
  //   return null;
  // }

  // const handleLogout = () => {

  //   Cookies.remove("authToken");
  //   window.location.href = "/login";
  // };

  return (
    <section className={`flex gap-6`}>
      <div
        className={`min-h-screen fixed z-10 ${open ? "w-60" : "w-16"
          } duration-500 px-4
          ${darkTheme ? 'border-dark-theme' : 'border-light-theme'}
          `}
      >
        <div className="flex justify-between">
          <span className={`content-center justify-start font-bold text-lg 
        whitespace-pre duration-200 ${!open && "opacity-0 translate-x-10 overflow-hidden"}`}>MusicApp</span>

          <span className="justify-end py-3 flex">
            <FaBars
              className="cursor-pointer"
              onClick={() => { setOpen(!open), toggleSideMenu() }}
            />
          </span>
        
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              className={` ${menu.margin && "mt-5"
                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div><CircumIcon name={`${menu.icon}`}/> </div>
              <h2
                style={{
                  transitionDelay: `${index + 3}00ms`,
                }}
                className={`whitespace-pre duration-200 ${!open && "opacity-0 translate-x-10 overflow-hidden"
                  }`}
              >
                {menu.name}
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
          {/* <button
            onClick={handleLogout}
            className="mt-5 group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
          >
            <div>
            <CircumIcon name={`logout`}/>
            </div>
            <h2
              className={`whitespace-pre duration-200 ${!open && "opacity-0 translate-x-10 overflow-hidden"
                }`}
            >
              Logout
            </h2>
            <h2
              className={`${open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
            >
              Logout
            </h2>
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default SideMenu;
