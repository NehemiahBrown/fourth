import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import UserAvatar from "../../assets/userAvatar.png";

export default function ShowFriendsModal({
  friendsData,
  showFriendsModal,
  closeShowFriendsModal,
}) {
  const navigate = useNavigate();
  return (
    <main
      className={`${showFriendsModal ? "translate-y-0" : "translate-y-full"} overflow-y-scroll fixed inset-0 z-1000 bg-[var(--background)] transition-transform duration-300`}
    >
      <section className="relative">
        <div className="absolute top-3 left-2">
          <ChevronLeft
            size={44}
            className="bg-[var(--surface)] p-2 text-[var(--accent)] backdrop-blur shadow-lg shadow-black/40 hover:bg-[var(--surface)]/80 rounded-full cursor-pointer"
            onClick={closeShowFriendsModal}
          />
        </div>
        <div className="pt-20 px-4">
          <h1 className="text-2xl font-bold text-[var(--accent)]">
            All Friends
          </h1>
          <hr />
          <div className="mt-6">
            {friendsData.map((friend) => {
              return (
                <div
                  onClick={() => navigate(`/users/${friend?.id}`)}
                  key={friend?.id}
                  className="relative flex items-center gap-4 py-2 cursor-pointer"
                >
                  <div>
                    <img
                      className="w-[55px] h-[55px] rounded-full"
                      src={`${friend?.profilePicture ? friend?.profilePicture : UserAvatar}`}
                      alt={`${friend?.userName} profile picture.`}
                    />
                  </div>
                  <div>
                    <p className="text-lg">{friend?.fullName}</p>
                    <p className="text-[var(--primary-text)]/80">
                      {friend?.userName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
