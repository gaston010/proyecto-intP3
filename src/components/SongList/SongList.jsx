import useSongs from "../hooks/useSongds";
import SongCard from "./SongCard"; // Asegúrate de que la ruta es correcta
import "bulma/css/bulma.min.css";
import "./SongList.css"; // Asegúrate de que la ruta es correcta

const SongList = () => {
  const { songs, loading, error, handleNext, handlePrevious } = useSongs(
    "http://sandbox.academiadevelopers.com/harmonyhub/songs/?page=1"
  );

  if (loading) {
    return <p>Loading songs...</p>;
  }

  if (error) {
    return <p>Error loading songs: {error.message}</p>;
  }

  // Divide las canciones en dos listas
  const halfIndex = Math.ceil(songs.length / 2);
  const firstHalf = songs.slice(0, halfIndex);
  const secondHalf = songs.slice(halfIndex);

  return (
    <div className="p-4 max-h-[600px] overflow-y-auto">
      <div className="flex justify-between mb-4">
        <button
          onClick={handlePrevious}
          disabled={!handlePrevious}
          className="bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          ⏮️
        </button>
        <button
          onClick={handleNext}
          disabled={!handleNext}
          className="bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          ⏭️
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          {firstHalf.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {secondHalf.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongList;
