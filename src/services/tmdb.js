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

export async function getUpcomingMovies(){
  const moviesPage1 = await getAPI("movie/upcoming?language=en-US&page=1")
  const moviesPage2 = await getAPI("movie/upcoming?language=en-US&page=2")
  const moviesPage3 = await getAPI("movie/upcoming?language=en-US&page=3")
  const moviesPage4 = await getAPI("movie/upcoming?language=en-US&page=4")
  const moviesPage5 = await getAPI("movie/upcoming?language=en-US&page=5")



  const currentDate = new Date();
  const movies = [
    ...moviesPage1.results,
    ...moviesPage2.results,
    ...moviesPage3.results,
    ...moviesPage4.results,
    ...moviesPage5.results,


  ]

  // API gave duplicate movies. This filters them out.
  const uniqueMovies = movies.filter((movie, index, self) => {
    return index === self.findIndex((otherMovie) => otherMovie.id === movie.id)
  })

  console.log(movies)

  
  const upcomingMoviesObject = uniqueMovies.filter((movie) => { const releaseDate = new Date(movie?.release_date); return (currentDate <= releaseDate)}).map((movie) => {
    return {
      id: movie.id,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, 
      backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      title: movie.title,

    }
  });
  return upcomingMoviesObject;
}

export async function getTrendingMovies() {
  const movies = await getAPI("trending/movie/day?language=en-US");
  const trendingMoviesObject = movies.results.map((movie) => {
    return {
      id: movie.id,
      backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
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
  const movie = await getAPI(
    `/movie/${movieId}?language=en-US&append_to_response=credits,videos`,
  );
  const date = new Date(movie.release_date);
  const year = date.getFullYear();
  const trailer = movie.videos.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );
  const movieDetailedData = {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    trailerKey: trailer?.key,
    backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    genres: movie.genres
      .map((movieGenre) => {
        return movieGenre.name;
      })
      .slice(0, 3),
    cast: movie.credits.cast
      .map((castMember) => {
        return {
          id: castMember.cast_id,
          character: castMember.character,
          castName: castMember.name,
          picture: castMember.profile_path
            ? `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
            : null,
        };
      })
      .slice(0, 20),
    country: movie.origin_country,
    language: movie.original_language,
    releaseYear: year,
    releaseDate: movie.release_date,
    runtime: movie.runtime,
  };
  return movieDetailedData;
}
