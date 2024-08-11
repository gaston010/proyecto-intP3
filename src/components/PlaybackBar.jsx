// PlaybackBar.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { MediaContext } from '../context/MediaContext';
import { ThemeContext } from '../context/ThemeContext';
import CircumIcon from "@klarr-agency/circum-icons-react"


import Cookies from 'js-cookie';
import useSong from './hooks/useSong';

const PlaybackBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const { darkTheme } = useContext(ThemeContext);
  

  const { 
          mediaFile, title, duration,
          prev, next, mediaFileList,
          setMediaFile, setTitle, setDuration,
          setPrev, setNext
        } = useContext(MediaContext);
  const audioRef = useRef(null);  

  const changeSong = (index) => {
    const song = mediaFileList[index];
    setMediaFile(song.song_file);
    setTitle(song.title);
    setDuration(song.duration);
    if(index+1 === mediaFileList.length){
        setNext(0);
    }
    else if (index === 0){
        setPrev(mediaFileList.length-1)
    }
    else {
      setPrev(index-1);
      setNext(index+1);
    }
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
      if (!isPlaying) {
        togglePlayPause();
        audioRef.current.play();
      }
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
    changeSong(next);
    togglePlayPause();
  };

  const handlePrev = (e) => {
    // useSong(next);
    changeSong(prev);
    togglePlayPause();
  }


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const token = Cookies.get("authToken");

  return (
    <div
      className={`bottom-0 flex items-center justify-between p-4 ${darkTheme ? 'border-dark-theme' : 'border-light-theme'}`}
      style={{
        display: `${mediaFile? 'flex':'none'}`,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        bottom: '0',
        background: `${darkTheme? '#333':'#fff'}`,
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
          <button onClick={handlePrev}>
            <CircumIcon name="square_chev_left"></CircumIcon>
          </button>
          <button onClick={togglePlayPause} style={{ fontSize: '4rem' }}>
            {isPlaying ? <CircumIcon name="pause_1" size="40px"></CircumIcon> : <CircumIcon name="play_1" size="40px"></CircumIcon>}
          </button>
          <button onClick={handleNext}>
            <CircumIcon name="square_chev_right"></CircumIcon>
          </button>
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
        <CircumIcon name="volume_high"/>
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
