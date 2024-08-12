import { useState, useEffect } from "react";
import ArtistCard from "./ArtistCard";

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    fetchArtists(
      "https://sandbox.academiadevelopers.com/harmonyhub/song-artists/"
    );
  }, []);

  const fetchArtists = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setArtists(data.results);
      setNext(data.next);
      setPrevious(data.previous);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading artists...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error loading artists: {error.message}
      </p>
    );
  }

  const handleNext = () => {
    fetchArtists(next);
  };

  const handlePrevious = () => {
    fetchArtists(
      previous ||
        "https://sandbox.academiadevelopers.com/harmonyhub/song-artists/"
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button onClick={handlePrevious} disabled={!previous} className="">
          ⏮️ Previous
        </button>
        <button onClick={handleNext} disabled={!next} className="">
          Next ⏭️
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container ">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
