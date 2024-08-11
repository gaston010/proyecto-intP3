// PlaybackBar.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { MediaContext } from '../context/MediaContext';
import Cookies from 'js-cookie';
import useSong from './hooks/useSong';
import { SiDocsdotrs } from 'react-icons/si';

const PlaybackBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);

  const { 
          mediaFile, title, duration,
          mediaFileList, setMediaFile, 
					setTitle, setDuration,
          index, setIndex
        } = useContext(MediaContext);
  const audioRef = useRef(null);  

  const changeSong = (ind) => {
		let i;
		switch (ind) {
			case -1: i = mediaFileList.length + ind; break;
		  case mediaFileList.length: i = 0; break;
			default: i = ind; break;
		}
    const song = mediaFileList[i];
    setMediaFile(song.song_file);
    setTitle(song.title);
    setDuration(song.duration);
    setIndex(i);
    // if(index === mediaFileList.length){
    //     setNext(0);
		// 		setIndex(index-1);
    // }
    // else if (index === 0){
    //     setPrev(mediaFileList.length-1)
		// 		setNext(index+1)
    // }
    // else {
    //   setPrev(index-1);
    //   setNext(index+1);
    // }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (mediaFile && audioRef.current) {
      audioRef.current.src = mediaFile;
      audioRef.current.load();
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [mediaFile]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      };
      audio.addEventListener('timeupdate', updateProgress);
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime =
        (audioRef.current.duration * e.target.value) / 100;
    }
  };

  const handleNext = (e) => {
    // useSong(prev);
    changeSong(index+1);
    // togglePlayPause();
  };

  const handlePrev = (e) => {
    // useSong(next);
    changeSong(index-1);
    // togglePlayPause();
  }


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const token = Cookies.get("authToken");

  return (
    <div
      className="bottom-0 bg-gray-900 text-white flex items-center justify-between p-4"
      style={{
        display: `${mediaFile? 'flex':'none'}`,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        bottom: '0',
        background: 'hsl(220deg 13.04% 9.02%)',
        boxShadow: '0px -1px 5px 0px rgba(0,0,0,0.75)',
        minWidth: '-webkit-fill-available'
      }}
    >
      <audio ref={audioRef} />
      <div
        className="flex flex-direction-column justify-items-center mx-8"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>{title}</h1>
        <div className="flex items-center space-x-4">
          <button onClick={handlePrev}>⏮️</button>
          <button onClick={togglePlayPause} style={{ fontSize: '2rem' }}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button onClick={handleNext}>⏭️</button>
        </div>
        <div className="flex-1 mx-4">
          <div className="flex justify-between">
            <span>
              {formatTime(
                (audioRef.current && audioRef.current.currentTime) || 0
              )}--  
            </span>
            <input
              type="range"
              min="0"
              max={duration}
              value={progress}
              onChange={handleProgressChange}
            />
            <span>--  {formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 mx-4">
        <span>🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24"
        />
      </div>
    </div>
  );
};

export default PlaybackBar;
