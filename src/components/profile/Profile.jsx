import UserAvatar from "../../assets/userAvatar.png";
import ProfilePictureModal from "../modals/ProfilePictureModal.jsx";
import SeeAllFavorites from "../common/SeeAllFavorites.jsx";

import { useAuth } from "../../context/AuthContext.jsx";
import {
  getUserDocument,
  getFavoriteMoviesDoc,
  getMovieWatchListDocs,
  listenForNewFriends,
} from "../../services/firestore.js";
import { useFavoriteMovies } from "../../context/FavoriteMoviesContext.jsx";
import { useWatchList } from "../../context/WatchListContext.jsx";
import { useState, useEffect } from "react";

import { ChevronRight, Camera } from "lucide-react";

export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState();
  const [usersFavoriteMovies, setUsersFavoriteMovies] = useState();
  const [usersWatchlist, setUsersWatchlist] = useState();
  const [usersFriends, setUsersFriends] = useState([]);
  const [showAllFavorites, setShowAllFavorites] = useState(false);
  const [topGenres, setTopGenres] = useState([]);

  const { currentUser, userProfile } = useAuth();

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function openFavoritesModal() {
    setShowAllFavorites(true);
  }

  function closeFavoritesModal() {
    setShowAllFavorites(false);
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      const [user, favorites, watchlist] = await Promise.all([
        getUserDocument(currentUser.uid),
        getFavoriteMoviesDoc(currentUser.uid),
        getMovieWatchListDocs(currentUser.uid),
      ]);

      setUserData({
        user,
        favorites,
        watchlist,
      });
    };
    fetchUserProfile();
  }, [currentUser.uid]);

  useEffect(() => {
    const unsubscribe = listenForNewFriends(currentUser.uid, setUsersFriends);
    return unsubscribe;
  }, [currentUser.uid]);

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

    if (genreCounts) {
      const favoriteGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
      setTopGenres(favoriteGenres);
    }
  }, [userData?.favorites]);

  return (
    <main>
      <section>
        <h1 className="text-3xl font-bold text-[var(--accent)]">Profile</h1>
        <div className="flex justify-center mt-6">
          <div
            onClick={openModal}
            className="relative w-fit h-auto cursor-pointer"
          >
            <img
              className="w-[120px] h-[120px] rounded-full"
              src={userProfile?.profilePicture || UserAvatar}
              alt="Profile Picture"
            />
            <Camera
              size={30}
              className="absolute bottom-0 right-0 bg-[var(--accent-dark)] p-1 rounded-full"
            />
          </div>
          {showModal && <ProfilePictureModal closeModal={closeModal} />}
        </div>
        <div className="mt-4 flex flex-col justify-center items-center ">
          <p className="text-4xl font-bold">
            {userProfile.fullName.split(" ")[0]}
          </p>
          <p className="text-lg text-[var(--primary-text)]/80">
            {"@" + userProfile.userName}
          </p>
        </div>
      </section>
      <section>
        <div className="mt-6 flex gap-4 justify-around py-4 border-y border-[var(--accent)]/20">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">{usersFriends.length}</p>
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
      </section>
      <section>
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
            {userData?.favorites?.slice(0, 6).map((movie, index) => {
              return (
                <div
                  key={movie?.id}
                  className={`${index <= 2 ? "block" : "hidden"} ${index <= 4 ? "md:block" : "md:hidden"} ${index <= 5 ? "lg:block" : "lg:hidden"}`}
                >
                  <img
                    src={movie?.poster}
                    alt={movie?.title}
                    className="aspect-[2/3] w-[9rem] md:w-[10rem] lg:w-[11rem] border border-white/15 object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="mt-12">
        <div>
          <p className="text-xl font-bold">Top Genres</p>
        </div>
        <div className="mt-6">
          {topGenres.map((genre) => {
            const totalFavoriteMovies = userData?.favorites?.length;
            const percentage = Math.floor(
              (genre[1] / totalFavoriteMovies) * 100,
            );

            return (
              <div key={genre[0]} className="w-full md:max-w-2xl">
                <div className="flex items-center justify-between">
                  <p>{genre[0]}</p>
                  <p>{`${percentage}%`}</p>
                </div>
                <progress
                  className="w-full genre-progressBar"
                  value={percentage}
                  max={100}
                />
              </div>
            );
          })}
        </div>
      </section>
      <SeeAllFavorites
        userData={userData}
        showAllFavorites={showAllFavorites}
        closeFavoritesModal={closeFavoritesModal}
      />
    </main>
  );
}
