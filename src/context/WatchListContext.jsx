import { createContext, useContext, useState } from "react";

export const WatchListContext = createContext();

export function useWatchList() {
  return useContext(WatchListContext);
}

export function WatchListProvider({ children }) {
  const [watchListMovies, setWatchListMovies] = useState([]);

  function addToWatchList(movie) {
    const alreadyAdded = watchListMovies.some((watchListMovie) => {
      return watchListMovie.id === movie.id;
    });

    if (!alreadyAdded) {
      setWatchListMovies((current) => [...current, movie]);
    }
  }

  function removeFromWatchList(movie) {
    setWatchListMovies((current) =>
      current.filter((watchListMovie) => watchListMovie.id !== movie.id),
    );
  }

  const watchListData = {
    watchListMovies,
    removeFromWatchList,
    addToWatchList,
  };

  return (
    <WatchListContext.Provider value={watchListData}>
      {children}
    </WatchListContext.Provider>
  );
}
