import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useFetchArtists = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookie = Cookies.get("authToken");
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
          const result = await response.json();
          result.results.forEach((item) => {
            if (item.image === null) {
              item.image = "src/assets/underweb.jpeg";
            }
          });
          setData(result.results);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchArtists;
