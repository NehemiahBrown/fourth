import { useParams } from "react-router";
import { useState } from "react";
import { getMovieDetails } from "../../services/tmdb.js";

export default function MovieDetailedView() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  getMovieDetails(movieId);
  return (
    <div>
      <p></p>
    </div>
  );
}
