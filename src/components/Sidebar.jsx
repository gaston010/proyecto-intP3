import { Link } from "react-router-dom";
import { FcNews } from "react-icons/fc";
import { CiBoxList } from "react-icons/ci";
import { GiLoveSong } from "react-icons/gi";
import { SiCounterstrike } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 text-white flex flex-col">
      <div className="test p-4 text-2xl font-bold flex items-center">
        <div className="w-10">
          <span className="icon my-2 mx-2">
            <SiCounterstrike />
          </span>
          Mi Aplicación
        </div>

        <div>
          <button className="py-2 px-4 bg-white rounded mt-auto">
            <Link to="/login">
              <span className="icon my-2 mx-2">
                <FaUserCircle />
              </span>
              Iniciar Sesión
            </Link>
          </button>
        </div>
      </div>

      <nav
        className="test flex p-4"
        style={{ flexDirection: "column", display: "flex" }}
        role="navigation"
        aria-label="main navigation"
      >
        <Link to="/news" className="py-2 px-4  rounded">
          <span className="icon my-2 mx-2">
            <FcNews />
          </span>
          Noticias
        </Link>

        <Link to="/genre" className="py-2 px-4 rounded">
          <span className="icon my-2 mx-2">
            <CiBoxList />
          </span>
          Generos
        </Link>
        <Link to="/songs" className="py-2 px-4 rounded">
          <span className="icon my-2 mx-2">
            <GiLoveSong />
          </span>
          Canciones
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
