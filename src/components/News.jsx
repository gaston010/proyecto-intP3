import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Carousel from "./Carousel";
import GenreList from "./GenreList";
import "bulma/css/bulma.min.css";

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
    <section className="section">
      <div className="container">
        <h1 className="title">News</h1>
        <p className="subtitle">Welcome to the news page!</p>
        <div className="columns">
          <div className="column is-full">
            <Carousel data={newsData} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-full">
            <GenreList />
          </div>
        </div>
      </div>
    </section>
  );
}

export default News;
