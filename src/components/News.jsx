import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Carousel from "./Carousel";

export function News() {
  const [newsData, setNewsData] = useState([]);

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
        if (response.ok) {
          var data = await response.json();
          data.forEach((item) => {
            if (item.image === null) {
              item.image = "src/assets/underweb.jpeg";
            }
          });
          setNewsData(data);
        }
      } catch (error) {
        console.error("Error fetching artist news data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <h1>News</h1>
      <p>Welcome to the news page!</p>

      <div className="flex">
        <div className="grid justify-center">
          <Carousel data={newsData}></Carousel>
        </div>
      </div>
    </div>
  );
}

export default News;
