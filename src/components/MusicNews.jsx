import { useState, useEffect } from "react";

export function MusicNews() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchMusicNews = async () => {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=fd58315aaf0d60e2c0169e363552da97&format=json`
        );
        if (response.ok) {
          const data = await response.json();
          // Transformar datos si es necesario
          const transformedData = data.tracks.track.map((track) => ({
            title: track.name,
            artist: track.artist.name,
            image: track.image[2]["#text"], // Elegimos un tamaño de imagen adecuado
            url: track.url,
          }));
          setNewsData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching music news:", error);
      }
    };

    fetchMusicNews();
  }, []);

  return (
    <div className="flex flex-col mt-4">
      <h2 className="text-center text-xl mb-4">Top Music News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsData.map((news, index) => (
          <div key={index} className="border p-4 rounded shadow-md">
            <img src={news.image} alt={news.title} className="mb-2 rounded" />
            <h3 className="text-lg font-bold">{news.title}</h3>
            <p className="text-sm text-gray-600">{news.artist}</p>
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mt-2 inline-block"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicNews;
