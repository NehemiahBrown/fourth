import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  getUserDocument,
  getFavoriteMoviesDoc,
  getMovieWatchListDocs,
} from "../../services/firestore.js";

import { Ellipsis, ChevronRight, ChevronLeft } from "lucide-react";
import SeeAllFavorites from "./SeeAllFavorites.jsx";
export default function SearchedUserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate()

  const [userData, setUserData] = useState({});
  const [friends, setFriends] = useState([]);
  const [showAllFavorites, setShowAllFavorites] = useState(false);
  const [topGenres, setTopGenres] = useState([]);

  function openFavoritesModal() {
    setShowAllFavorites(true);
  }

  function closeFavoritesModal() {
    setShowAllFavorites(false);
  }

  useEffect(() => {
    const genreCounts = userData?.favorites?.reduce((counts, movie) => {
      movie.genres.forEach((genre) => {
        if (counts[genre]) {
          counts[genre] = counts[genre] + 1;
        } else {
          counts[genre] = 1;
        }
      });
      return counts;
    }, {});

    if(genreCounts){
      const favoriteGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]).slice(0, 3)
      setTopGenres(favoriteGenres)
    }

  }, [userData?.favorites]);


  useEffect(() => {
    const fetchUserProfile = async () => {
      const [user, favorites, watchlist] = await Promise.all([
        getUserDocument(userId),
        getFavoriteMoviesDoc(userId),
        getMovieWatchListDocs(userId),
      ]);

      setUserData({
        user,
        favorites,
        watchlist,
      });
    };
    fetchUserProfile();
  }, [userId]);

  console.log(userData);

  return (
    <main>
      <button onClick={() => navigate(-1)} className="inline-block bg-[var(--surface)] p-1 text-[var(--accent)] backdrop-blur shadow-lg shadow-black/40 hover:bg-[var(--surface)]/80 rounded-full cursor-pointer"><ChevronLeft size={30}/></button>
      <div className="ml-6 flex gap-4">
        <div className="mt-2">
          <img
            src={userData?.user?.profilePicture}
            alt={`${userData?.user?.userName} profile picture.`}
            className="w-[100px] h-[100px] rounded-full"
          />
        </div>
        <div>
          <p className="text-3xl font-bold">{userData?.user?.fullName}</p>
          <p className=" text-lg text-[var(--primary-text)]/80">{`@${userData?.user?.userName}`}</p>
          <div className="mt-2 flex gap-2">
            <button className="bg-[var(--accent-dark)] px-6 py-2 rounded-md text-lg font-bold cursor-pointer active:scale-96 hover:bg-[var(--accent-dark)]/80 transform-colors duration-200">
              Add Friend
            </button>
            <button className="bg-[var(--accent)] px-6 py-2 rounded-md text-lg font-bold cursor-pointer active:scale-96 hover:bg-[var(--accent)]/80 transform-colors duration-200">
              <Ellipsis />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex gap-4 justify-around py-4 border-y border-[var(--accent)]/20">
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold">{friends.length}</p>
          <p className="text-lg">Friends</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold">{userData?.favorites?.length}</p>
          <p className="text-lg">Favorites</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold">{userData?.watchlist?.length}</p>
          <p className="text-lg">Watchlist</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">Favorite Movies</p>
          <button
            onClick={openFavoritesModal}
            className="flex items-center text-[var(--accent)] text-lg cursor-pointer"
          >
            See All <ChevronRight />
          </button>
        </div>
        <div className="flex gap-2 mt-6">
          {userData?.favorites?.map((movie, index) => {
            return (
              <div
                key={movie?.id}
                className={`${index <= 2 ? "block" : "hidden"} ${index <= 4 ? "md:block" : "md:hidden"} ${index <= 5 ? "lg:block" : "lg:hidden"}`}
              >
                <img
                  src={movie?.poster}
                  alt={movie?.title}
                  className="aspect-[2/3] border border-white/15 object-cover"
                />
              </div>
            );
          })}
        </div>
        <section className="mt-8">
          <div>
            <p className="text-xl font-bold">Top Genres</p>
          </div>
          <div className="mt-6">
            {
              topGenres.map((genre) =>{
                const totalFavoriteMovies = userData?.favorites?.length;
                const percentage = Math.floor(genre[1] / totalFavoriteMovies * 100);
          
                return (
                  <div key={genre[0]} className="w-full md:max-w-2xl">
                    <div className="flex items-center justify-between">
                      <p>{genre[0]}</p>
                      <p>{`${percentage}%`}</p>
                    </div>
                    <progress className="w-full genre-progressBar" value={percentage} max={100}/>
                  </div>
                )
              })
            }
          </div>
        </section>
      </div>
      <SeeAllFavorites
        userData={userData}
        showAllFavorites={showAllFavorites}
        closeFavoritesModal={closeFavoritesModal}
      />
    </main>
  );
}
