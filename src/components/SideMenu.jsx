import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiSettings4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FcNews } from 'react-icons/fc';
import { CiBoxList } from "react-icons/ci";
import { GiLoveSong } from "react-icons/gi";
import { SiCounterstrike } from "react-icons/si";
import {FaUserCircle, FaBars} from "react-icons/fa";

const homeButtons = [
  { name: "Iniciar Sesión", path: "/login", icon: FaUserCircle },
  { name: "Noticias", path: "/news", icon: FcNews },
  { name: "Géneros", path: "/genre", icon: CiBoxList },
  { name: "Canciones", path: "/songs", icon: GiLoveSong, margin: true },
  { name: "Setting", path: "/", icon: RiSettings4Line }
];

const menus = [
  { name: "Log out", path: "/", icon: FaUserCircle },
  { name: "Noticias", path: "/news", icon: FcNews },
  { name: "Géneros", path: "/genre", icon: CiBoxList },
  { name: "Canciones", path: "/songs", icon: GiLoveSong, margin: true },
  { name: "Setting", path: "/", icon: RiSettings4Line }
];

const SideMenu = () => {
  
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen absolute ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="justify-end py-3 flex">
          <FaBars
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.path}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-200 ${
                  !open && "opacity-0 translate-x-10 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      {/* <div className="m-3 text-xl text-gray-900 font-semibold"> */}

      {/* </div> */}
    </section>
  );
};

export default SideMenu;
