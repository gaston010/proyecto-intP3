import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Carousel from "./Carousel";


function Home() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let cookie = Cookies.get("authToken");
        const response = await fetch(
          "https://sandbox.academiadevelopers.com/harmonyhub/artists/?format=json",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          }
        );
        console.log(response);
        if (response.ok) {
          var data = await response.json();
          data.results.forEach((item) => {
            if (item.image === null) {
              item.image = "src/assets/underweb.jpeg";
            }
          });
          setData(data.results);
        }
      } catch (error) {
        console.error("Error fetching artist news data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex  flex-col items-center">
      <span className="text-6xl">
        Welcome to the MusicApp!
      </span>
      <span className="text-4xl">
        Please login
      </span>
      <div>
        <Carousel data={data}></Carousel>
      </div>
    </div>
  );
}

export default Home;
