import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

import { getTrendingMovies } from "../../services/tmdb.js";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recentlyWatched, setRecentlyWatched] = useState([]);

  const carouselRef = useRef(null);
  const navigate = useNavigate();

  //   Get trending movie data
  useEffect(() => {
    const fetchData = async () => {
      const trendingMoviesData = await getTrendingMovies();
      setTrendingMovies(trendingMoviesData);
    };
    fetchData();
  }, []);

  //   Carousel scroll functions
  function scrollLeft() {
    const carouselWidth = carouselRef.current.clientWidth;
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -(carouselWidth - 30),
        behavior: "smooth",
      });
    }
  }

  function scrollRight() {
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
      <div className="relative w-full mt-6 px-2">
        <input
          type="search"
          className="h-[35px] w-full pl-[8px] bg-[var(--surface)] border border-white/5 border-b-white/15 shadow-[var(--shadow-input)] rounded-md"
          placeholder="Search movies, actors, directors..."
        />
        <Search className="absolute -translate-y-1/2 top-[50%] right-[12px]" />
      </div>
      <div className="flex flex-col gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg font-bold">Recently Watched</p>
            <hr className="w-[75%]" />
          </div>
          <div className="flex justify-center items-center h-[120px] border border-white/15">
            <p className="opacity-80">Add films to your watched list.</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg font-bold">Trending Right Now</p>
            <hr className="w-[75%]" />
          </div>
          <div className="relative">
            <button
              onClick={scrollLeft}
              className="hidden md:block absolute carouselArrow top-0 bottom-0 left-0 z-10 opacity-0 bg-transparent active:bg-black/50 transition-colors duration-500 cursor-pointer"
            >
              <ChevronLeft size={80} />
            </button>
            <div
              className=" flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory"
              ref={carouselRef}
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
              onClick={scrollRight}
              className="hidden md:block absolute carouselArrow top-0 bottom-0 right-0 z-10 opacity-0 bg-transparent active:bg-black/50 transition-colors duration-500 cursor-pointer"
            >
              <ChevronRight size={80} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg font-bold">What Your Friends Are Watching</p>
            <hr className="w-[75%]" />
          </div>
          <div className="flex justify-center items-center h-[120px] border border-white/15">
            <p className="opacity-80 text-center w-[80%]">
              See what your friends are watching, rating and loving!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
