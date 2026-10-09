import { createContext, useContext, useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { getMovieWatchListDocs } from "../services/firestore";
import { useAuth } from "./AuthContext.jsx";

export const WatchListContext = createContext();
export function useWatchList() {
  return useContext(WatchListContext);
}

export function WatchListProvider({ children }) {
  const { currentUser } = useAuth();

  const [watchListMovies, setWatchListMovies] = useState([]);
  const [watchListLoading, setWatchListLoading] = useState(true)


  useEffect(() => {
    async function fetchWatchListMovies() {
      try { 
        if (currentUser) {
        const usersWatchListMovies = await getMovieWatchListDocs(
          currentUser.uid,
        );
        setWatchListMovies(usersWatchListMovies);
      } else {
        setWatchListMovies([]);
      }}catch(error){
        console.log(error.message)
      }finally{
        setWatchListLoading(false)
      }
    }
    fetchWatchListMovies();
  }, [currentUser]);

  function addToWatchList(movie) {
    const alreadyAdded = watchListMovies.some((watchListMovie) => {
      return watchListMovie.id === movie.id;
    });

    if (!alreadyAdded) {
      setWatchListMovies((current) => [
        ...current,
        {
          ...movie,
          addedAt: Timestamp.now(),
        },
      ]);
    }
  }

  function removeFromWatchList(movie) {
    setWatchListMovies((current) =>
      current.filter((watchListMovie) => watchListMovie.id !== movie.id),
    );
  }

  const watchListData = {
    watchListMovies,
    watchListLoading,
    removeFromWatchList,
    addToWatchList,
  };

  return (
    <WatchListContext.Provider value={watchListData}>
      {children}
    </WatchListContext.Provider>
  );
}
