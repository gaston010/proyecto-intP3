import React, { createContext, useState } from 'react';

export const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [mediaFileList, setMediaFileList] = useState([]);
  const [mediaFile, setMediaFile] = useState(null);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [isSameList, setIsSameList] = useState(true);
  const [newContext, setNewContext] = useState(true);
  // const [length, setLength] = useState(0);
  return (
    <MediaContext.Provider value={
      { 
        mediaFileList, setMediaFileList,
        mediaFile, setMediaFile, 
        title, setTitle, 
        duration, setDuration,
        prev, setPrev,
        next, setNext,
        isSameList, setIsSameList,
        newContext, setNewContext,
      }
    }>
      {children}
    </MediaContext.Provider>
  );
};