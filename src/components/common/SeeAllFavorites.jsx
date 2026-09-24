import { X, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
export default function SeeAllFavorites({
  userData,
  showAllFavorites,
  closeFavoritesModal,
}) {
  console.log(userData);
  const navigate = useNavigate();

  return (
    <main
      className={`w-full mx-auto max-w-4xl no-scrollbar ${showAllFavorites ? "translate-y-0" : "translate-y-full"} overflow-y-scroll fixed inset-0 z-1000 px-2 bg-[var(--background)] transition-transform duration-300`}
    >
      <div className="sticky top-0 border-b border-[var(--accent)] bg-[var(--background)] z-10 py-4">
        <div className="flex gap-2 items-center">
          <ChevronLeft onClick={closeFavoritesModal} size={35} />
          <h1 className="text-3xl ">{`${userData?.user?.fullName.split(" ").slice(0, 1).join("")}'s Favorites`}</h1>
        </div>
      </div>
      <div className="">
        <div className="mt-6 ml-2">
          <p className="text-white/50">{`${userData?.favorites?.length} ${userData?.favorites?.length === 1 ? "movie" : "movies"}`}</p>
        </div>
      </div>

      <div className="py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 px-2">
        {userData?.favorites?.map((movie) => {
          return (
            <div key={movie?.id} onClick={() => navigate(`/movie/${movie.id}`)}>
              <img src={movie?.poster} alt="" />
            </div>
          );
        })}
      </div>
    </main>
  );
}
