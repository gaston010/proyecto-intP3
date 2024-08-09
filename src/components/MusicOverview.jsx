import { useState, useEffect } from "react";

export function MusicOverview() {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topTags, setTopTags] = useState([]);

  const apiKey = "fd58315aaf0d60e2c0169e363552da97";

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`
        );
        if (response.ok) {
          const data = await response.json();
          setTopTracks(data.tracks.track.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };

    const fetchTopArtists = async () => {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&format=json`
        );
        if (response.ok) {
          const data = await response.json();
          setTopArtists(data.artists.artist.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };

    const fetchTopTags = async () => {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptags&api_key=${apiKey}&format=json`
        );
        if (response.ok) {
          const data = await response.json();
          setTopTags(data.toptags.tag.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching top tags:", error);
      }
    };

    fetchTopTracks();
    fetchTopArtists();
    fetchTopTags();
  }, [apiKey]);

  return (
    <div className="flex flex-col mt-8 p-6 bg-w-200 rounded-lg shadow-lg ">
      <h2 className="text-center text-2xl font-bold mb-6 text-white-800 hover:scale-105">
        Music Overview
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">Top Tracks</h3>
        <ul className="space-y-3">
          {topTracks.map((track, index) => (
            <li
              key={index}
              className="p-4 bg-white rounded-lg shadow hover:bg-blue-50 transition duration-300 ease-in-out"
            >
              <strong className="text-gray-700">{track.name}</strong> by{" "}
              <span className="text-blue-500">{track.artist.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-green-600">
          Top Artists
        </h3>
        <ul className="space-y-3">
          {topArtists.map((artist, index) => (
            <li
              key={index}
              className="p-4 bg-white rounded-lg shadow hover:bg-green-50 transition duration-300 ease-in-out"
            >
              <strong className="text-gray-700 hover-sacale:105">{artist.name}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-purple-600">Top Tags</h3>
        <ul className="space-y-3">
          {topTags.map((tag, index) => (
            <li
              key={index}
              className="p-4 bg-white rounded-lg shadow hover:bg-purple-50 transition duration-300 ease-in-out"
            >
              <strong className="text-gray-700">{tag.name}</strong> (used{" "}
              <span className="text-purple-500">{tag.count}</span> times)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MusicOverview;
