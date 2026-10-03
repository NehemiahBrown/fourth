import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

import { getTrendingMovies, getUpcomingMovies, getMovies} from "../../services/tmdb.js";
import {getFriends, getFriendsFavorites} from "../../services/firestore.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [recentlyWatched, setRecentlyWatched] = useState([]);
  const [friendsData, setFriendsData ] = useState([]);
  const [friendsFavoriteMovies, setFriendsFavoriteMovies] = useState([])
  const [searchedMovies, setSearchedMovies] = useState("");
  const [searchResults, setSearchResults] = useState();

  const { currentUser } = useAuth();

  const trendingRef = useRef(null);
  const upcomingRef = useRef(null);
  const friendsFavoriteRef = useRef(null)

  const navigate = useNavigate();

  const handleSearchBarChange = (e) =>{
    const searchedMovieValue = e.target.value;
    setSearchedMovies(searchedMovieValue)
  }

  useEffect(() => {
    if(searchedMovies.length > 2){
      const getSearchedMovies = async () => {
        const movies = await getMovies(searchedMovies)
        setSearchResults(movies)
      }
      getSearchedMovies()
    }
    
  }, [searchedMovies])

  console.log(searchResults)


  useEffect(() =>{
    const handleGettingFriends = async () => {
      const friends = await getFriends(currentUser?.uid)
      setFriendsData(friends)
    }
    handleGettingFriends();
  }, [])

  useEffect(() => {
    if (friendsData.length === 0 ){
      setFriendsFavoriteMovies([])
      return
    }

    const getFriendsFavoriteMovieArray = async () => {
      const array = await getFriendsFavorites(friendsData)
      const combinedArray = array.flat();
      const movieCounts = combinedArray.reduce((counts, movie) => {
          if(counts[movie.id]){
            counts[movie.id].friendCount += 1;
          } else {
            counts[movie.id] = {
              movie,
              friendCount: 1,
            }
          }
          return counts
      }, {})
  if(movieCounts){
    const friendsFavoriteMoviesArray = Object.entries(movieCounts)
    .sort((a, b) => b[1].friendCount - a[1].friendCount)
    .slice(0, 3);
    setFriendsFavoriteMovies(friendsFavoriteMoviesArray)
  }}
    getFriendsFavoriteMovieArray();
  }, [friendsData])
  
  

  //   Get trending movie data
  useEffect(() => {
    const fetchData = async () => {
      const trendingMoviesData = await getTrendingMovies();
      setTrendingMovies(trendingMoviesData);
    };
    fetchData();
  }, []);

  // get upcoming movie data
  useEffect(() => {
    const fetchData = async () => {
      const upcomingMoviesData = await getUpcomingMovies();
      setUpcomingMovies(upcomingMoviesData);
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
    <main>
      <form className="relative w-full mt-6 px-2">
        <input
          type="search"
          value={searchedMovies}
          onChange={handleSearchBarChange}
          className="h-[35px] w-full pl-[8px] bg-[var(--surface)] border border-white/5 border-b-white/15 shadow-[var(--shadow-input)] rounded-md"
          placeholder="Search movies, actors, directors..."
        />
        <Search
          size={20}
          className="absolute -translate-y-1/2 top-[50%] right-[15px]"
        />
      </form>
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
          {friendsFavoriteMovies.length <= 0 ? 
          <div className="flex justify-center items-center h-[120px] border border-white/15">
            <p className="opacity-80 text-center w-[80%]">
              Add friends to see what they're watching!
            </p>
          </div> : 
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
          </div>}
        </div>
      </div>
    </main>
  );
}
