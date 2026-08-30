import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../../services/tmdb.js";

export default function MovieDetailedView() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const [showFullOverview, setShowFullOverview] = useState(false);

  useEffect(() =>{
    const fetchMovieData = async () => {
      const movieData = await getMovieDetails(movieId);
      setMovieDetails(movieData)
    }
    fetchMovieData();
  }, [])

  console.log(movieDetails)

  function toggleOverview(){
    setShowFullOverview((current) => !current)
  }

  return (
    <main className="h-dvh">
      <div className="relative">
        <img src={movieDetails?.backdrop} alt={`${movieDetails?.title} backdrop.`} className="w-full"/>
          <div className="absolute bottom-0 px-2">
            <p className="max-w-[75%] text-3xl">{movieDetails?.title}</p>
            <div>
              <div className="flex gap-2">
                <p>{movieDetails?.releaseYear}</p>
                <p>·</p>
                <p>{`${Math.floor(Math.round(movieDetails?.runtime / 60))}h ${movieDetails?.runtime % 60}m`}</p>
              </div>
              <p className="flex gap-2">{movieDetails?.genres.join(" · ")}</p>
            </div>
          </div>
      </div>
      <div className="md:flex md:mt-8 gap-4">
        <div className="hidden md:flex">
          <img src={movieDetails?.poster} alt={`${movieDetails?.title} poster`} />
        </div>
        <div className="flex flex-col gap-2 px-3 py-4">
          <div className="flex flex-col">
            <p className="text-lg md:text-xl font-bold">Overview :</p>
            <p className={`${showFullOverview === false ? "line-clamp-3" : "line-clamp-none"} md:text-lg`}>{movieDetails?.overview}</p>
            <button onClick={toggleOverview} className="mt-2 bg-[var(--accent-dark)] px-2 py-1 text-sm md:text-md self-end rounded-lg">{`${showFullOverview === false ? "Read More" : "Hide"}`}</button>
          </div> 
          <div>
          <p className="text-lg md:text-xl font-bold">Cast :</p>
          </div></div>
      </div>
    </main>
  );
}
