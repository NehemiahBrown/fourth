import { Search } from "lucide-react"

export default function HomeLoading(){
    return (
        <main className="animate-pulse">
          <section>
            <div className="relative w-full mt-6 px-2 h-[35px]"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-12 z-100 flex flex-col gap-2 bg-[var(--surface)] w-[98%] mx-auto py-1 px-2 max-h-[300px] md:max-h-[400px] overflow-y-scroll rounded-sm">
                <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px]"></div>
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
                </div>
            </div>
        </div>
        </main>
      );
    
}