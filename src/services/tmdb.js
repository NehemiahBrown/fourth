const token = import.meta.env.VITE_TMDB_TOKEN;
const baseUrl = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  },
};

export async function getAPI(endpoint) {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getTrendingMovies() {
  const movies = await getAPI("trending/movie/day?language=en-US");
  const trendingMoviesObject = movies.results.map((movie) => {
    return {
      id: movie.id,
      backdrop: movie.backdrop_path,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      title: movie.title,
      overview: movie.overview,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
    };
  });
  return trendingMoviesObject;
}

export async function getMovieDetails(movieId) {
  const movie = await getAPI(`/movie/${movieId}?language=en-US`);
  return;
}
