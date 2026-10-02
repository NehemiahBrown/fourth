import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import {
  getUserDocument,
  getFavoriteMoviesDoc,
  getMovieWatchListDocs,
  sendFriendRequest,
  checkFriendStatus,
  acceptFriendRequest,
  removeFriend,
} from "../../services/firestore.js";

import UserAvatar from "../../assets/userAvatar.png"
import { Ellipsis, ChevronRight, ChevronLeft, Plus, Check, Handshake } from "lucide-react";

import SeeAllFavorites from "./SeeAllFavorites.jsx";

import {useAuth } from "../../context/AuthContext.jsx"

export default function SearchedUserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate()
  const { currentUser } = useAuth();

  const [userData, setUserData] = useState({});
  const [showAllFavorites, setShowAllFavorites] = useState(false);
  const [topGenres, setTopGenres] = useState([]);
  const [friends, setFriends] = useState([])
  const [friendStatus, setFriendStatus] = useState(null);
  const [optionsDropdown, setOptionsDropdown] = useState(false)

  function openFavoritesModal() {
    setShowAllFavorites(true);
  }

  function closeFavoritesModal() {
    setShowAllFavorites(false);
  }

  function toggleOptionsDropdown(){
    setOptionsDropdown(current => !current)
  }

  // Formual for collecting all of the instances of favorited movie's genres.
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

 async function handleAddingFriends(){
    if(currentUser.uid === userId){
      return 
    }

    if(friendStatus === "Add Friend"){
      await sendFriendRequest(currentUser.uid, userId)
      setFriendStatus("Requested")
    } else if(friendStatus === "Confirm"){
      await acceptFriendRequest(currentUser.uid, userId)
      setFriendStatus("Friends")
    }
    }

  async function handleRemovingFriends(){
    await removeFriend(currentUser.uid, userId)
    setFriendStatus("Add Friend")
  }
    


// Collect user profile data for UI rendering
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

  useEffect(() => {
    if(!currentUser?.uid){
      return 
    }
    const checkFriendRequestStatus = async () => {
      const status = await checkFriendStatus(currentUser.uid, userId);
      setFriendStatus(status)
    }
    checkFriendRequestStatus()
  }, [userId, currentUser?.uid])

  return (
    <main>
      <button onClick={() => navigate(-1)} className="inline-block bg-[var(--surface)] p-1 text-[var(--accent)] backdrop-blur shadow-lg shadow-black/40 hover:bg-[var(--surface)]/80 rounded-full cursor-pointer"><ChevronLeft size={30}/></button>
      <div className="sm:ml-2 md:ml-6 flex gap-4">
        <div className="mt-2 flex gap-2">
          <img
            src={`${userData?.user?.profilePicture ? userData?.user?.profilePicture : UserAvatar}`}
            alt={`${userData?.user?.userName} profile picture.`}
            className="w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] rounded-full"
          />
          <div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold">{userData?.user?.fullName}</p>
              <p className=" text-lg text-[var(--primary-text)]/80">{`@${userData?.user?.userName}`}</p>
            </div>
            <div className="mt-2 flex gap-2">
            <button onClick={handleAddingFriends} className="flex items-center justify-center  gap-1 w-[130px] xs:w-[160px] h-[40px] bg-[var(--accent-dark)] py-2 rounded-md xs:text-lg font-bold cursor-pointer enabled:active:scale-96 enabled:hover:bg-[var(--accent-dark)]/80 transform-colors duration-200 disabled:opacity-50" disabled={friendStatus === "Requested"}>
              {friendStatus === "Add Friend" && <Plus size={20}/>}
              {friendStatus === "Requested" && <Check size={20}/>}
              {friendStatus === "Friends" && <Handshake size={20}/>}


              {friendStatus}
            </button>
            <div className="relative md:flex md:gap-2 md:items-center">
              <button onClick={toggleOptionsDropdown} className="flex items-center justify-center w-[60px] h-[40px] bg-[var(--accent)] py-2 rounded-md text-lg font-bold cursor-pointer active:scale-96 hover:bg-[var(--accent)]/80 transform-colors duration-200">
                <Ellipsis />
              </button>
              {optionsDropdown && <div onClick={handleRemovingFriends} className="absolute md:static bg-white/60 px-4 py-2 rounded-sm mt-1 cursor-pointer">
                <p className="text-nowrap">Remove Friend</p>
              </div>}
            </div>
           
          </div>
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
