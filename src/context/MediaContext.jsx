import React, { createContext, useState } from 'react';

export const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [mediaFile, setMediaFile] = useState(null);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);

  return (
    <MediaContext.Provider value={{ mediaFile, setMediaFile , title, setTitle, duration, setDuration}}>
      {children}
    </MediaContext.Provider>
  );
};