import { useWatchList } from "../../context/WatchListContext";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";

export default function WatchList() {
  const { watchListMovies, removeFromWatchList, addToWatchList } =
    useWatchList();
  const carouselRef = useRef(null);

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
  console.log(watchListMovies);

  return (
    <>
      <div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-[var(--accent)]">Watchlist</h1>
          <p>{`${watchListMovies.length === 0 ? "No saved movies yet." : `${watchListMovies.length} ${watchListMovies.length === 1 ? "Title" : "Titles"}`}`}</p>
        </div>

        <div className="relative mt-2">
          <button
            onClick={scrollLeft}
            className="absolute carouselArrow top-0 bottom-0 left-0 z-10 opacity-0 bg-transparent active:bg-black/50 transition-colors duration-500 cursor-pointer"
          >
            <ChevronLeft size={30} />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory"
          >
            <button className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Action
            </button>
            <button className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Adventure
            </button>
            <button className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Animation
            </button>
            <button className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Comedy
            </button>
            <button className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Crime
            </button>
            <button className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Documentary
            </button>
            <button className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Drama
            </button>
            <button className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Family
            </button>
            <button className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Fantasy
            </button>
            <button className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Horror
            </button>
            <button className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Romance
            </button>
            <button className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              SciFi
            </button>
            <button className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer">
              Thriller
            </button>
          </div>
          <button
            onClick={scrollRight}
            className="absolute carouselArrow top-0 bottom-0 right-0 z-10 opacity-0 bg-transparent active:bg-black/50 transition-colors duration-500 cursor-pointer"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      </div>
    </>
  );
}
