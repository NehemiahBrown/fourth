import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import HomeLoading from "../loading/HomeLoading.jsx"

import {
  getTrendingMovies,
  getUpcomingMovies,
  getMovies,
} from "../../services/tmdb.js";
import { getFriends, getFriendsFavorites } from "../../services/firestore.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [friendsData, setFriendsData] = useState([]);
  const [friendsFavoriteMovies, setFriendsFavoriteMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [trendingLoading, setTrendingLoading] = useState(true);
  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [friendsDataLoading, setFriendsDataLoading] = useState(true)

  const pageLoading = trendingLoading || upcomingLoading || friendsLoading;

  const { currentUser } = useAuth();

  const trendingRef = useRef(null);
  const upcomingRef = useRef(null);
  const friendsFavoriteRef = useRef(null);

  const navigate = useNavigate();

  const handleSearchBarChange = (e) => {
    const searchedMovieValue = e.target.value;
    setSearchedMovies(searchedMovieValue);
  };

  useEffect(() => {
    if (searchedMovies.length > 2) {
      const getSearchedMovies = async () => {
        const movies = await getMovies(searchedMovies);
        const moviesWithPosters = movies?.filter((movie) => {
          return movie?.poster !== null;
        });
        setSearchResults(moviesWithPosters);
      };
      getSearchedMovies();
    } else {
      setSearchResults([]);
      return;
    }
  }, [searchedMovies]);

  useEffect(() => {
    const handleGettingFriends = async () => {
     try { 
      const friends = await getFriends(currentUser?.uid);
      setFriendsData(friends);
    } catch(error){
        console.log(error.message)
    } finally{
      setFriendsDataLoading(false)
    }
    };
    handleGettingFriends();
  }, [currentUser.uid]);

  useEffect(() => {
    if(friendsDataLoading){
      return
    }

    if (friendsData.length === 0) {
      setFriendsFavoriteMovies([]);
      setFriendsLoading(false)
      return;
    }
    const getFriendsFavoriteMovieArray = async () => {
      try{
        const array = await getFriendsFavorites(friendsData);
      const combinedArray = array.flat();
      const movieCounts = combinedArray.reduce((counts, movie) => {
        if (counts[movie.id]) {
          counts[movie.id].friendCount += 1;
        } else {
          counts[movie.id] = {
            movie,
            friendCount: 1,
          };
        }
        return counts;
      }, {});
      if (movieCounts) {
        const friendsFavoriteMoviesArray = Object.entries(movieCounts)
          .sort((a, b) => b[1].friendCount - a[1].friendCount)
          .slice(0, 3);
        setFriendsFavoriteMovies(friendsFavoriteMoviesArray);
      }
    } catch(error){
      console.log(error.message)
    } finally{
      setFriendsLoading(false);
    }
      }   
    getFriendsFavoriteMovieArray();

  }, [friendsData]);

  //   Get trending movie data
  useEffect(() => {
    const fetchData = async () => {
      try{
        const trendingMoviesData = await getTrendingMovies();
        setTrendingMovies(trendingMoviesData);
      }catch(error){
        console.log(error.message)
      } finally{
        setTrendingLoading(false)
      }
        }
    fetchData();
  }, []);

  // get upcoming movie data
  useEffect(() => {
    const fetchData = async () => {
      try{
        const upcomingMoviesData = await getUpcomingMovies();
        setUpcomingMovies(upcomingMoviesData);
      } catch(error){
        console.log(error.message)
      }finally{
        setUpcomingLoading(false)
      }
    };
    fetchData();
  }, []);

  //   Carousel scroll functions
  function scrollLeft(carouselRef) {
    const carouselWidth = carouselRef.current.clientWidth;
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -(carouselWidth - 30),
        behavior: "smooth",
      });
    }
  }

  function scrollRight(carouselRef) {
    const carouselWidth = carouselRef.current.clientWidth;
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselWidth - 30,
        behavior: "smooth",
      });
    }
  }

  return (
     pageLoading ? <HomeLoading /> : <main>
      <section className="relative">
        <form className="relative w-full mt-6 px-2">
          <input
            type="text"
            value={searchedMovies}
            onChange={handleSearchBarChange}
            className="h-[35px] w-full pl-[8px] bg-[var(--surface)] border border-white/5 border-b-white/15 shadow-[var(--shadow-input)] rounded-md"
            placeholder="Search any movie title..."
          />
          <Search
            size={20}
            className="absolute -translate-y-1/2 top-[50%] right-[15px]"
          />
        </form>
        {searchedMovies.length > 2 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-12 z-100 flex flex-col gap-2 bg-[var(--surface)] w-[98%] mx-auto py-1 px-2 max-h-[300px] md:max-h-[400px] overflow-y-scroll rounded-sm">
            {searchResults.slice(0, 15).map((result) => {
              return (
                <div
                  key={result.id}
                  onClick={() => navigate(`/movie/${result.id}`)}
                  className="flex gap-2 py-2 border-y border-[var(--accent)]/40 cursor-pointer"
                >
                  <div>
                    <img
                      className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px]"
                      src={result?.poster}
                      alt={`${result?.title}'s poster.`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate">{result?.title}</p>
                    <p className="text-xs text-[var(--primary-text)]/70">
                      {result?.releaseDate}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      <div className="flex flex-col gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg font-bold">Trending Right Now</p>
            <hr className="w-[75%]" />
          </div>
          <div className="relative">
            <button
              onClick={() => scrollLeft(trendingRef)}
              className="hidden md:block absolute carouselArrow top-0 bottom-0 left-0 z-10 opacity-0 bg-transparent active:bg-black/50 transition-colors duration-500 cursor-pointer"
            >
              <ChevronLeft size={80} />
            </button>
            <div
              className=" flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory"
              ref={trendingRef}
            >
              {trendingMovies.map((movie) => {
                return (
                  <div key={movie.id} className="shrink-0 snap-start">
                    <img
                      onClick={() => navigate(`/movie/${movie.id}`)}
                      src={movie.poster}
                      alt={movie.title}
                      className="w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"
                    />
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => scrollRight(trendingRef)}
              className="hidden md:block absolute carouselArrow top-0 bottom-0 right-0 z-10 opacity-0 bg-transparent active:bg-black/50 transition-colors duration-500 cursor-pointer"
            >
              <ChevronRight size={80} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg font-bold">Coming Soon</p>
            <hr className="w-[75%]" />
          </div>
          <div className="relative">
            <button
              onClick={() => scrollLeft(upcomingRef)}
              className="hidden md:block absolute carouselArrow top-0 bottom-0 left-0 z-10 opacity-0 bg-transparent active:bg-black/50 transition-colors duration-500 cursor-pointer"
            >
              <ChevronLeft size={80} />
            </button>
            <div
              className=" flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory"
              ref={upcomingRef}
            >
              {upcomingMovies.map((movie) => {
                return (
                  <div key={movie.id} className="shrink-0 snap-start">
                    <img
                      onClick={() => navigate(`/movie/${movie.id}`)}
                      src={movie.poster}
                      alt={movie.title}
                      className="w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"
                    />
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => scrollRight(upcomingRef)}
              className="hidden md:block absolute carouselArrow top-0 bottom-0 right-0 z-10 opacity-0 bg-transparent active:bg-black/50 transition-colors duration-500 cursor-pointer"
            >
              <ChevronRight size={80} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg font-bold">Friend Favorites</p>
            <hr className="w-[75%]" />
          </div>
          {friendsFavoriteMovies.length <= 0 ? (
            <div className="flex justify-center items-center h-[120px] border border-white/15">
              <p className="opacity-80 text-center w-[80%]">
                Add friends to see what they're watching!
              </p>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => scrollLeft(friendsFavoriteRef)}
                className="hidden md:block absolute carouselArrow top-0 bottom-0 left-0 z-10 opacity-0 bg-transparent active:bg-black/50 transition-colors duration-500 cursor-pointer"
              >
                <ChevronLeft size={80} />
              </button>
              <div
                className=" flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory"
                ref={friendsFavoriteRef}
              >
                {friendsFavoriteMovies.map((movie) => {
                  return (
                    <div key={movie[0]} className="shrink-0 snap-start">
                      <img
                        onClick={() => navigate(`/movie/${movie[0]}`)}
                        src={movie[1].movie.poster}
                        alt={movie[1].movie.title}
                        className="w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"
                      />
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => scrollRight(friendsFavoriteRef)}
                className="hidden md:block absolute carouselArrow top-0 bottom-0 right-0 z-10 opacity-0 bg-transparent active:bg-black/50 transition-colors duration-500 cursor-pointer"
              >
                <ChevronRight size={80} />
              </button>
            </div>
          )}
        </div>
      </div>  
    </main>
  )
}
