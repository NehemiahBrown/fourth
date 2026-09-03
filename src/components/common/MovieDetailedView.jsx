import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import { getMovieDetails } from "../../services/tmdb.js";
import {
  addMovieToWatchList,
  deleteMovieFromWatchList,
} from "../../services/firestore.js";

import { useWatchList } from "../../context/WatchListContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

import {
  Bookmark,
  Heart,
  Play,
  User,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import TrailerModal from "./TrailerModal.jsx";

export default function MovieDetailedView() {
  const { movieId } = useParams();
  const { watchListMovies, removeFromWatchList, addToWatchList } =
    useWatchList();
  const { currentUser } = useAuth();

  const [movieDetails, setMovieDetails] = useState();
  const [isOverviewOverflowing, setIsOverviewOverflowing] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const overviewRef = useRef(null);
  const carouselRef = useRef(null);

  const isInWatchList = watchListMovies.some(
    (movie) => movie.id === movieDetails?.id,
  );

  function closeModal() {
    setShowTrailerModal(false);
  }

  function openModal() {
    setShowTrailerModal(true);
  }

  function toggleFavoriteMovie() {
    setIsFavorite((current) => !current);
  }

  function addOrRemoveFromWatchList() {
    if (!isInWatchList) {
      // adding to state
      addToWatchList(movieDetails);
      //adding to firestore
      addMovieToWatchList(currentUser.uid, movieDetails);
    } else if (isInWatchList) {
      // deleting from state
      removeFromWatchList(movieDetails);
      //deleting from firestore
      deleteMovieFromWatchList(currentUser.uid, movieDetails?.id);
    }
  }

  useEffect(() => {
    const fetchMovieData = async () => {
      const movieData = await getMovieDetails(movieId);
      setMovieDetails(movieData);
    };
    fetchMovieData();
  }, [movieId]);

  useEffect(() => {
    function checkOverviewOverflow() {
      const overview = overviewRef.current;

      if (overview && !showFullOverview) {
        setIsOverviewOverflowing(overview.scrollHeight > overview.clientHeight);
      }
    }
    checkOverviewOverflow();
    window.addEventListener("resize", checkOverviewOverflow);

    return () => {
      window.removeEventListener("resize", checkOverviewOverflow);
    };
  }, [movieDetails, showFullOverview]);

  console.log(movieDetails);

  function toggleOverview() {
    setShowFullOverview((current) => !current);
  }

  function scrollLeft() {
    if (carouselRef.current) {
      const carouselWidth = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        left: -(carouselWidth * 0.7),
        behavior: "smooth",
      });
    }
  }

  function scrollRight() {
    if (carouselRef.current) {
      const carouselWidth = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        left: carouselWidth * 0.7,
        behavior: "smooth",
      });
    }
  }

  return (
    <main className="h-dvh">
      <div className="relative ">
        <img
          src={movieDetails?.backdrop}
          alt={`${movieDetails?.title} backdrop.`}
          className=" w-full"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent via-[var(--background)]/80 to-[var(--background)]"></div>
        <div className="absolute bottom-0 max-w-[75%] px-4 pb-2">
          <p className=" text-3xl">{movieDetails?.title}</p>
          <div>
            <div className="flex gap-2">
              <p>{movieDetails?.releaseYear}</p>
              <p>·</p>
              <p>{`${Math.floor(Math.round(movieDetails?.runtime / 60))}h ${movieDetails?.runtime % 60}m`}</p>
            </div>
            <p className="flex gap-2">{movieDetails?.genres.join(" · ")}</p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 px-4 pb-2">
          <button
            onClick={openModal}
            className="p-2 bg-[var(--accent-dark)] rounded-full active:scale-95 hover:bg-[var(--accent)] hover:text-[var(--accent-dark)] transition-all duration-200 cursor-pointer"
          >
            <Play size={30} />
          </button>
        </div>
      </div>
      <div className="md:flex md:mt-8 gap-4">
        <div className="hidden md:flex">
          <img
            src={movieDetails?.poster}
            alt={`${movieDetails?.title} poster`}
            className="h-[250px] max-w-[400px]"
          />
        </div>
        <div className="flex flex-col gap-2 px-3 py-4 min-w-0 flex-1">
          <div className="flex gap-2">
            <button
              onClick={addOrRemoveFromWatchList}
              className="flex items-center gap-2 px-3 
                      py-2 rounded-lg 
                      border border-[var(--accent-dark)] 
                      hover:bg-[var(--accent-dark)] active:scale-95 
                      transition-all duration-200 cursor-pointer"
            >
              <Bookmark
                size={18}
                className={isInWatchList ? "fill-current" : ""}
              />
              Watchlist
            </button>

            <button
              onClick={toggleFavoriteMovie}
              className="flex items-center gap-2 px-3 
                      py-2
                      rounded-lg
                      border border-[var(--accent-dark)]
                      hover:bg-[var(--accent-dark)] active:scale-95
                      transition-all duration-200 cursor-pointer"
            >
              <Heart size={18} className={isFavorite ? "fill-current" : ""} />
              Favorite
            </button>
          </div>
          <div className="flex flex-col">
            <p className="text-lg md:text-xl font-bold">Overview :</p>
            <p
              ref={overviewRef}
              className={`${showFullOverview === false ? "line-clamp-3" : "line-clamp-none"} md:text-lg`}
            >
              {movieDetails?.overview}
            </p>
            {isOverviewOverflowing && (
              <button
                onClick={toggleOverview}
                className="mt-2 bg-[var(--accent-dark)] px-2 py-1 text-sm sm:text-md self-end rounded-lg cursor-pointer"
              >{`${!showFullOverview ? "Read More" : "Show Less"}`}</button>
            )}
          </div>
          <div>
            <p className="text-lg md:text-xl font-bold">Cast :</p>
            <div className="mt-4 relative">
              <button
                onClick={scrollLeft}
                className="absolute carouselArrow top-0 h-[75px] left-2 z-10 opacity-0 active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={40} />
              </button>
              <div
                ref={carouselRef}
                className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory"
              >
                {movieDetails?.cast.map((actor) => {
                  return (
                    <div
                      key={actor.id}
                      className="flex flex-col items-center w-[110px] shrink-0 snap-start"
                    >
                      {actor.picture ? (
                        <img
                          className="w-[75px] h-[75px] rounded-2xl object-cover"
                          src={actor.picture}
                          alt={`${actor.castName} photo`}
                        />
                      ) : (
                        <div className="border border-[var(--accent)] rounded-2xl">
                          <User
                            size={30}
                            className="w-[60px] h-[60px] rounded-2xl"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-center">{actor.castName}</p>
                        <div>
                          <p className="text-center text-sm text-[var(--primary-text)]/60 line-clamp-2">
                            {actor.character}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={scrollRight}
                className="absolute carouselArrow top-0 right-2 h-[75px] z-10 opacity-0 active:scale-95 cursor-pointer"
              >
                <ChevronRight size={40} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {showTrailerModal && (
        <TrailerModal
          trailerKey={movieDetails?.trailerKey}
          title={movieDetails?.title}
          closeModal={closeModal}
        />
      )}
    </main>
  );
}
