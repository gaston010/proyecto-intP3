import { useState, useEffect } from "react";

const useGenreDetails = (genreId) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenreDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://sandbox.academiadevelopers.com/harmonyhub/genres/${genreId}/`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (genreId) {
      fetchGenreDetails();
    }
  }, [genreId]);

  return { details, loading, error };
};

export default useGenreDetails;
