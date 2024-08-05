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
        console.log(response);
        if (response.ok) {
          var data = await response.json();
          data.results.forEach((item) => {
            if (item.image === null) {
              item.image = "src/assets/underweb.jpeg";
            }
          });
          setNewsData(data.results);
        }
      } catch (error) {
        console.error("Error fetching artist news data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
     <h1 className="title text-center">News</h1>
      <div className="flex">
        <div className="grid justify-center">
          <Carousel data={newsData}></Carousel>
        </div>
      </div>
    </div>
  );
}

export default News;
