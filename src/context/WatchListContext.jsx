import { createContext, useContext, useState, useEffect } from "react";
import { getMovieWatchListDocs } from "../services/firestore";
import { useAuth } from "./AuthContext.jsx";

export const WatchListContext = createContext();

export function useWatchList() {
  return useContext(WatchListContext);
}

export function WatchListProvider({ children }) {
  const { currentUser } = useAuth();

  const [watchListMovies, setWatchListMovies] = useState([]);

  useEffect(() => {
    async function fetchWatchListMovies() {
      if (currentUser) {
        const usersWatchListMovies = await getMovieWatchListDocs(
          currentUser.uid,
        );
        setWatchListMovies(usersWatchListMovies);
      } else {
        setWatchListMovies([]);
      }
    }
    fetchWatchListMovies();
  }, [currentUser]);

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
