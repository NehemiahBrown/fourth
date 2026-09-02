import { useWatchList } from "../../context/WatchListContext";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef, useState } from "react";
import {useNavigate} from "react-router"
import FourthIcon from "../../assets/fourthicon.png"

export default function WatchList() {
  const { watchListMovies, removeFromWatchList, addToWatchList } =
    useWatchList();

  const [movieGenre, setMovieGenre] = useState("All")
  const filteredMovies = movieGenre === "All" ? watchListMovies : watchListMovies.filter((movie) => movie.genres.some((genre) => movieGenre.toLowerCase() === genre.toLowerCase()))

  const carouselRef = useRef(null);
  const navigate = useNavigate()

  //   Carousel scroll functions
  function scrollLeft() {
    if (!carouselRef.current) {
      return;
    }

    const genreButtons = [...carouselRef.current.children];

    const currentButtonIndex = genreButtons.findIndex((button) => {
      return button.offsetLeft >= carouselRef.current.scrollLeft;
    });

    const previousButton = genreButtons[currentButtonIndex - 1];

    previousButton?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }

  function scrollRight() {
    if (!carouselRef.current) {
      return;
    }

    const genreButtons = [...carouselRef.current.children];

    const currentButtonIndex = genreButtons.findIndex((button) => {
      return button.offsetLeft >= carouselRef.current.scrollLeft;
    });

    const nextButton = genreButtons[currentButtonIndex + 1];

    nextButton?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }

  // filter movies based on genre
  function filterMovies(e){
    const buttonText = e.currentTarget.textContent
    setMovieGenre(buttonText)
  }

  return (
    <>
    <section className="flex flex-col flex-1">
      <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-[var(--accent)]">Watchlist</h1>
          <div className="flex justify-between items-center">
            <p>{`${watchListMovies.length === 0 ? "No saved movies yet." : `${watchListMovies.length} ${watchListMovies.length === 1 ? "Title" : "Titles"}`}`}</p>
            <select className="bg-[var(--accent)] text-[var(--secondary-text)] rounded-md py-1 px-3 focus:outline-none focus:ring-0 cursor-pointer">
              <option value="recent">Sort: Recently Added</option>
              <option value="title">Sort: Title</option>
              <option value="releaseDate">Sort: Release Date</option>
            </select>
          </div>
      </div>

      <div className="flex flex-col w-full flex-1">
        <div className="relative  mt-4">
          <button
            onClick={scrollLeft}
            className="absolute hidden md:block carouselArrow top-0 bottom-0 left-0 z-10 opacity-0 bg-transparent active:bg-black/50 transition-colors duration-500 cursor-pointer"
          >
            <ChevronLeft size={30} />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory"
          >
             <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              All
            </button>
            <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Action
            </button>
            <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Adventure
            </button>
            <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Animation
            </button>
            <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Comedy
            </button>
            <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Crime
            </button>
            <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Documentary
            </button>
            <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Drama
            </button>
            <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Family
            </button>
            <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Fantasy
            </button>
            <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Horror
            </button>
            <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Romance
            </button>
            <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Science Fiction
            </button>
            <button onClick={filterMovies} className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Thriller
            </button>
          </div>
          <button
            onClick={scrollRight}
            className="absolute carouselArrow hidden md:block top-0 bottom-0 right-0 z-10 opacity-0 bg-transparent active:bg-black/50 transition-colors duration-500 cursor-pointer"
          >
            <ChevronRight size={30} />
          </button>
        </div>
        <div className="grid flex-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {filteredMovies.length === 0 ? 
            <div className="col-span-full flex items-center justify-center">
              <p className="text-3xl md:text-6xl text-center">No Movies in this genre</p> 
            </div> 
          : filteredMovies.map((movie) =>{
            return (
              <div key={movie.id} className="overflow-hidden">
                <img onClick={() => navigate(`/movie/${movie.id}`)} src={movie.poster} alt={movie.title} className="object-cover hover:scale-110 active:scale-98 transition-transform duration-300 ease-in-out cursor-pointer "/>
              </div>
            )
          })}
        </div>
      </div>
      </section>
    </>
  );
}
