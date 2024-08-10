import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Carousel from './Carousel';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { BsDashLg } from 'react-icons/bs';
import { FaRegCirclePlay } from "react-icons/fa6";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [hot100, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let cookie = Cookies.get('authToken');
        const response = await fetch(
          'https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-artist-100/recent.json'
        );
        if (response.ok) {
          var data = await response.json();
          // data.results.forEach((item) => {
          //   if (item.image === null) {
          //     item.image = 'src/assets/Unknown.png';
          //   }
          // });
          setNewsData(data.data);
        }
      } catch (error) {
        console.error('Error fetching artist news data:', error);
      }
    };



    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-28 overflow-hidden
    ">
      <h1 className="text-4xl font-bold">Top Artist</h1>
      <div className="flex">
        <div className="grid justify-center min-h-full">
          <Carousel data={newsData}></Carousel>
        </div>
      </div>
      <div className="" >
        <BillboardTop100 songs={hot100}></BillboardTop100>
      </div>
    </div>
  );
}

const BillboardTop100 = () => {
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;

  useEffect(() => {
    const fetchBillboardTop100 = async () => {
      try {
        let cookie = Cookies.get('authToken');
        const response = await fetch(
          'https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-hot-100/recent.json'
        );
        if (response.ok) {
          const data = await response.json();
          return data.data;
        } else {
          console.error('Error fetching Billboard Top 100 data:', response.statusText);
          return [];
        }
      } catch (error) {
        console.error('Error fetching Billboard Top 100 data:', error);
        return [];
      }
    };

    const fetchData = async () => {
      const data = await fetchBillboardTop100();
      setSongs(data);
    };

    fetchData();
  }, []);


  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

  const nextPage = () => {
    if (currentPage < Math.ceil(songs.length / songsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="billboard-top-100">
      <h2 className="text-2xl font-bold mb-4">Top 100</h2>
      <div className="flex flex-row-reverse justify-center" >

      <div className='justify-around text-5xl'>
        <button onClick={prevPage} disabled={currentPage === 1}>
        ⏮️
        </button>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(songs.length / songsPerPage)}>
        ⏭️
        </button>
      </div>

      <ul>
        {currentSongs.map((song, index) => (
          <li key={index} className="flex items-center space-x-4 m-2 song-list">

            <div className="flex items-center">
                {song.rank < song.last_week_rank ? (
                  <FaArrowUp className="text-green-500" />
                ) : song.rank > song.last_week_rank ? (
                  <FaArrowDown className="text-red-500" />
                ) : <BsDashLg className="text-gray-500"/>}
            </div>

            <h1 className="text-2xl" >{song.rank}</h1>
            <div className="w-16 h-16">
              <img src={song.image} alt={song.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <FaRegCirclePlay>
                <h2 className="text-lg font-bold">{song.title}</h2>  
              </FaRegCirclePlay>
              <h3 className="text-lg font-bold">{song.name}</h3>
              <p >{song.artist}</p>
            </div>
          </li>
        ))}
      </ul>
      </div>

    </div>
  );
}

export default News;
