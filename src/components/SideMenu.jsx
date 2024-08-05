import React, { useState } from "react";
import { RiSettings4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FcNews } from "react-icons/fc";
import { CiBoxList } from "react-icons/ci";
import { GiLoveSong } from "react-icons/gi";
import { FaUserCircle, FaBars } from "react-icons/fa";
import Cookies from "js-cookie";

const menus = [
  { name: "Noticias", path: "/news", icon: FcNews },
  { name: "Géneros", path: "/genre", icon: CiBoxList },
  { name: "Canciones", path: "/songs", icon: GiLoveSong, margin: true },
  { name: "Setting", path: "/", icon: RiSettings4Line },
];

const SideMenu = () => {
  const [open, setOpen] = useState(true);
  const token = Cookies.get("authToken");

  if (!token) {
    return null;
  }

  const handleLogout = () => {
    Cookies.remove("authToken");
    window.location.href = "/login";
  };

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen fixed z-10 ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      > 
      <div className="flex justify-between">
      <span className={`content-center justify-start font-bold text-lg 
        whitespace-pre duration-200 ${
        !open && "opacity-0 translate-x-10 overflow-hidden"}`}>MusicApp</span>
      <span className="justify-end py-3 flex">
          <FaBars
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </span>
      </div> 
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              className={` ${
                menu.margin && "mt-5"
              } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${index + 3}00ms`,
                }}
                className={`whitespace-pre duration-200 ${
                  !open && "opacity-0 translate-x-10 overflow-hidden"
                }`}
              >
                {menu.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="mt-5 group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
          >
            <div>
              <FaUserCircle size={20} />
            </div>
            <h2
              className={`whitespace-pre duration-200 ${
                !open && "opacity-0 translate-x-10 overflow-hidden"
              }`}
            >
              Logout
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
            >
              Logout
            </h2>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SideMenu;
