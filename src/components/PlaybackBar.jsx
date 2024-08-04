// PlaybackBar.jsx
import React, { useState } from 'react';

const PlaybackBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };

  return (
    <div
      className="bottom-0 bg-gray-900 text-white flex items-center justify-between p-4"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '0',
        background: 'hsl(220deg 13.04% 9.02%)',
        boxShadow: '0px -1px 5px 0px rgba(0,0,0,0.75)',
        minWidth: '-webkit-fill-available'
      }}
    >
      <div
        className="flex flex-direction-column justify-items-center"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div className="flex items-center space-x-4">
          <button onClick={() => console.log('Previous')}>⏮️</button>
          <button onClick={togglePlayPause} style={{ fontSize: '2rem' }}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button onClick={() => console.log('Next')}>⏭️</button>
        </div>
        <div className="flex-1 mx-4">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full"
          />
        </div>
      </div>
      <div
        className="flex items-center space-x-2"
        style={{
          position: 'absolute',
          right: '0'
        }}
      >
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
