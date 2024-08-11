import React, { createContext, useState } from 'react';

export const SongsListContext = createContext();

export const SongsListProvider = ({ children }) => {
  const [currPage, setCurrPage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  return (
    <SongsListContext.Provider value={
      { 
        currPage, setCurrPage,
        loading, setLoading,
        nextPage, setNextPage,
        prevPage, setPrevPage,
      }
    }>
      {children}
    </SongsListContext.Provider>
  );
};