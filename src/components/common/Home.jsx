import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getTrendingMovies } from "../../services/tmdb.js"



export default function Home(){
    const [trendingMoviesObject, setTrendingMoviesObject] = useState([])
   
    useEffect(() => {
        const fetchData = async () => {
            const trendingMovies =  await getTrendingMovies()
            setTrendingMoviesObject(trendingMovies)
        };
        fetchData(); 
    }, [])

    console.log(trendingMoviesObject)

    return(
        <main className="px-4">
            <div className="relative w-full py-4 px-2">
                <input type="search" className="h-[35px] w-full pl-[8px] bg-[var(--surface)] border border-white/5 border-b-white/15 shadow-[var(--shadow-input)] rounded-md" placeholder="Search movies, actors, directors..."/>
                <Search className="absolute -translate-y-1/2 top-[50%] right-[12px]"/>
            </div>

            <div className="flex flex-col gap-4">
            <div>
                <p className="text-lg font-bold">Trending Right Now</p>
                <hr className="w-[75%]"/>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                {
                trendingMoviesObject.map((movie) => {
                    return (
                        <div key={movie.id} className="shrink-0 snap-start">
                            <img src={movie.poster} alt={movie.title} className="w-[9rem] md:w-[10rem] lg:w-[11rem] aspect-[2/3] border border-white/15 object-cover"/>
                        </div>
                    )
                })  
                }
            </div>
            </div>
        </main>

    )
}