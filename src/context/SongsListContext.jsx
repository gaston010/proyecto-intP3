import React, { createContext, useState } from 'react';

export const SongsListContext = createContext();

export const SongsListProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  return (
    <SongsListContext.Provider value={
      { songs, setSongs , loading, setLoading, error, setError, next, setNext, previous, setPrevious}
    }>
      {children}
    </SongsListContext.Provider>
  );
};