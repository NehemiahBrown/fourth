export default function WatchlistLoading(){
    return (
        <>
          <section className="flex flex-col flex-1">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-[var(--accent)]">Watchlist</h1>
              <div className="flex justify-between items-center">
                <select
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-[var(--accent)] text-[var(--secondary-text)] rounded-md py-1 px-3 focus:outline-none focus:ring-0 cursor-pointer"
                >
                  <option className="cursor-pointer" value="default">
                    Recently Added
                  </option>
                  <option className="cursor-pointer" value="oldest">
                    Oldest Added
                  </option>
                  <option className="cursor-pointer" value="titleAlphabetical">
                    Title [A-Z]
                  </option>
                  <option className="cursor-pointer" value="titleReverse">
                    Title [Z-A]
                  </option>
                  <option className="cursor-pointer" value="releaseDateNewest">
                    Release Date: Newest
                  </option>
                  <option className="cursor-pointer" value="releaseDateOldest">
                    Release Date: Oldest
                  </option>
                </select>
              </div>
            </div>
    
            <div className="flex flex-col w-full flex-1">
              <div className="relative  mt-4">
                <div

                  className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory"
                >
                  <button

                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    All
                  </button>
                  <button
                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    Action
                  </button>
                  <button
                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    Adventure
                  </button>
                  <button
                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    Animation
                  </button>
                  <button
                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    Comedy
                  </button>
                  <button
                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    Crime
                  </button>
                  <button
                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    Documentary
                  </button>
                  <button
                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    Drama
                  </button>
                  <button
                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    Family
                  </button>
                  <button
                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    Fantasy
                  </button>
                  <button
                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    Horror
                  </button>
                  <button
                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    Romance
                  </button>
                  <button
                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    Science Fiction
                  </button>
                  <button
                    className="border border-[var(--accent-dark)] rounded-md px-3 py-[0.8px] hover:bg-[var(--accent-dark)] active:scale-95 snap-start shrink-0 cursor-pointer"
                  >
                    Thriller
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 animate-pulse">
                <div className="w-full aspect-[2/3] border border-white/15 bg-[var(--loading-background)] hover:scale-110 active:scale-98 transition-transform duration-300 ease-in-out cursor-pointer "></div>
                <div className="w-full aspect-[2/3] border border-white/15 bg-[var(--loading-background)] hover:scale-110 active:scale-98 transition-transform duration-300 ease-in-out cursor-pointer "></div>
                <div className="w-full aspect-[2/3] border border-white/15 bg-[var(--loading-background)] hover:scale-110 active:scale-98 transition-transform duration-300 ease-in-out cursor-pointer "></div>
                <div className="w-full aspect-[2/3] border border-white/15 bg-[var(--loading-background)] hover:scale-110 active:scale-98 transition-transform duration-300 ease-in-out cursor-pointer "></div>
                <div className="w-full aspect-[2/3] border border-white/15 bg-[var(--loading-background)] hover:scale-110 active:scale-98 transition-transform duration-300 ease-in-out cursor-pointer "></div>
                <div className="w-full aspect-[2/3] border border-white/15 bg-[var(--loading-background)] hover:scale-110 active:scale-98 transition-transform duration-300 ease-in-out cursor-pointer "></div>
                <div className="hidden md:block w-full aspect-[2/3] border bg-[var(--loading-background)] border-white/15 hover:scale-110 active:scale-98 transition-transform duration-300 ease-in-out cursor-pointer "></div>
                <div className="hidden md:block w-full aspect-[2/3] border bg-[var(--loading-background)] border-white/15 hover:scale-110 active:scale-98 transition-transform duration-300 ease-in-out cursor-pointer "></div>

              </div>
                <div className="mx-auto mt-6 w-[70%] max-w-[150px]">
                  <button
                    className="w-full bg-[var(--accent)] py-1 rounded-sm cursor-pointer active:scale-95"
                  >
                    Load More
                  </button>
                </div>
            </div>
          </section>
        </>
      );
}