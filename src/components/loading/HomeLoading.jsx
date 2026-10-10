import { Search } from "lucide-react"

export default function HomeLoading(){
    return (
        <main className="animate-pulse">
          <section>
          <div className="animate-pulse relative w-full mt-6 h-[35px] w-full pl-[8px] bg-[var(--surface)] border border-white/5 border-b-white/15 shadow-[var(--shadow-input)] rounded-md">
              <Search
                size={20}
                className="absolute -translate-y-1/2 top-[50%] right-[15px]"
              />
            </div>
          </section>

          <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-lg font-bold">Trending Right Now</p>
                <hr className="w-[75%]" />
              </div>
                <div className="flex relative gap-3">
                    <div className="w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                    <div className="w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                    <div className="w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                    <div className="hidden sm:block w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                    <div className="hidden sm:block w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>

                </div>
            </div>
        </div>

        <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-lg font-bold">Coming Soon</p>
                <hr className="w-[75%]" />
              </div>
                <div className="flex relative gap-3">
                    <div className="w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                    <div className="w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                    <div className="w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                    <div className="hidden sm:block w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                    <div className="hidden sm:block w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-lg font-bold">Friend Favorites</p>
                <hr className="w-[75%]" />
              </div>
                <div className="flex relative gap-3">
                    <div className="w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                    <div className="w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                    <div className="w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                    <div className="hidden sm:block w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                    <div className="hidden sm:block w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] bg-[var(--loading-background)] border border-white/15 object-cover hover:border-[var(--accent-dark)] hover:border-2 cursor-pointer transition-all duration-100"></div>
                </div>
            </div>
        </div>
        </main>
      );
    
}