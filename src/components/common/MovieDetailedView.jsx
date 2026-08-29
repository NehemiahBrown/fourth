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
      <div className="relative md:flex">
        <img src={movieDetails?.backdrop} alt={`${movieDetails?.title} backdrop.`} className="w-full"/>
          <div className="absolute bottom-0 px-2">
            <p className="max-w-[75%] text-3xl">{movieDetails?.title}</p>
            <div>
              <p>{movieDetails?.releaseYear}</p>
              <p>{movieDetails?.genres.join(" · ")}</p>
            </div>
          </div>
      </div>
      <div className="px-3 py-4">
        <div className="flex flex-col">
          <p>Overview:</p>
          <p className={`overview ${showFullOverview === false ? "line-clamp-3" : "line-clamp-none"}`}>{movieDetails?.overview}</p>
          <button onClick={toggleOverview} className="mt-2 bg-[var(--accent-dark)] px-2 py-1 text-sm md:text-md self-end rounded-lg">{`${showFullOverview === false ? "Read More" : "Hide Text"}`}</button>
        </div> 
      </div>
    </main>
  );
}
