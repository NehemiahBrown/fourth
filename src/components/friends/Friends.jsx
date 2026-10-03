import { Search, ChevronRight } from "lucide-react";

import {
  findAFriend,
  listenForFriendRequests,
  listenForNewFriends,
  getUserDocument,
  declineFriendRequest,
  acceptFriendRequest,
} from "../../services/firestore";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../../context/AuthContext.jsx";

import UserAvatar from "../../assets/userAvatar.png";

export default function Friends() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [friendInputValue, setFriendInputValue] = useState("");
  const [friendSearchResults, setFriendSearchResults] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRequestUsers, setFriendRequestUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendsData, setFriendsData] = useState([]);

  function captureFriendInputValue(e) {
    setFriendInputValue(e.target.value);
  }
  // handling adding and declining friend requests
  async function handleDecliningRequests(userId) {
    await declineFriendRequest(currentUser.uid, userId);
  }

  async function handleAddingFriends(userId) {
    await acceptFriendRequest(currentUser.uid, userId);
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (friendInputValue.length >= 2) {
        const results = await findAFriend(friendInputValue);
        // Removing current user from search results
        const filteredResults = results.filter(
          (result) => currentUser.uid !== result.uid,
        );
        setFriendSearchResults(filteredResults);
      } else {
        setFriendSearchResults([]);
      }
    };
    fetchSearchResults();
  }, [friendInputValue]);

  // Listening for friend requests that come in
  useEffect(() => {
    if (!currentUser?.uid) {
      return;
    }
    const unsubscribe = listenForFriendRequests(
      currentUser.uid,
      setFriendRequests,
    );
    return unsubscribe;
  }, [currentUser?.uid]);

  // function to get friend requests data for UI rendering
  useEffect(() => {
    const fetchFriendRequestUsers = async () => {
      const users = await Promise.all(
        friendRequests.map((requests) => {
          return getUserDocument(requests.senderId);
        }),
      );
      setFriendRequestUsers(users);
    };
    fetchFriendRequestUsers();
  }, [friendRequests]);

  // Listener for new friends
  useEffect(() => {
    if (!currentUser?.uid) {
      return;
    }
    const unsubscribe = listenForNewFriends(currentUser.uid, setFriends);
    return unsubscribe;
  }, [currentUser?.uid]);

  // function to get friend data for UI rendering
  useEffect(() => {
    const fetchFriends = async () => {
      const allFriends = await Promise.all(
        friends.map((friend) => {
          return getUserDocument(friend.id);
        }),
      );
      setFriendsData(allFriends);
    };
    fetchFriends();
  }, [friends]);

  return (
    <main>
      <section className="flex flex-col mx-auto w-[98%]">
        <div>
          <h1 className="text-3xl font-bold text-[var(--accent)]">Friends</h1>
        </div>
        <form className="relative w-full mt-6">
          <input
            type="text"
            value={friendInputValue}
            onChange={captureFriendInputValue}
            className="h-[35px] w-full pl-[8px] bg-[var(--surface)] border border-white/5 border-b-white/15 shadow-[var(--shadow-input)] rounded-md"
            placeholder="Search a friend's username..."
          />
          <Search
            size={20}
            className="absolute -translate-y-1/2 top-[50%] right-[15px]"
          />
        </form>
        {friendSearchResults.length > 0 && (
          <div className="bg-white/80 w-[98%] mx-auto py-1 px-2 mt-2 rounded-sm">
            {friendSearchResults.map((friend) => {
              return (
                <div
                  key={friend?.uid}
                  onClick={() => navigate(`/users/${friend?.uid}`)}
                  className="cursor-pointer"
                >
                  <div className="flex gap-2 items-center py-2">
                    <img
                      className="w-[38px] h-[38px] rounded-md"
                      src={
                        friend?.profilePicture
                          ? friend?.profilePicture
                          : UserAvatar
                      }
                      alt={friend?.userName + " profile picture."}
                    />
                    <p className="text-[var(--secondary-text)]">
                      {friend?.userName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      <section className="mt-4">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">Friend Requests</p>
          <p>{friendRequestUsers.length}</p>
        </div>
        <hr className="mt-2" />
        <div className="py-6">
          {friendRequestUsers.map((user) => {
            return (
              <div
                key={user?.id}
                className="h-[65px] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <div className="shrink-0">
                    <img
                      src={`${user?.profilePicture ? user?.profilePicture : UserAvatar}`}
                      alt={`${user?.userName}'s profile pciture.`}
                      className="w-[55px] h-[55px] rounded-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg truncate">{user?.fullName}</p>
                    <p className="text-[var(--primary-text)]/80 truncate">{`@${user?.userName}`}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleAddingFriends(user?.id)}
                    className="bg-[var(--accent-dark)] text-white py-1 px-2 rounded-sm cursor-pointer transition-all duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecliningRequests(user?.id)}
                    className="border border-gray-600 text-gray-300 py-1 px-2 rounded-sm cursor-pointer hover:bg-[var(--accent)] hover:text-white hover:border-white"
                  >
                    Decline
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">Friends</p>
          <p>{friends.length}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex flex-col gap-4 py-6">
          {friendsData.map((friend) => {
            return (
              <div
                key={friend.id}
                onClick={() => navigate(`/users/${friend?.id}`)}
                className="relative flex items-center gap-4 py-2 cursor-pointer"
              >
                <div>
                  <img
                    src={`${friend?.profilePicture ? friend?.profilePicture : UserAvatar}`}
                    alt={`${friend?.userName}'s profile pciture.`}
                    className="w-[55px] h-[55px] rounded-full"
                  />
                </div>
                <div>
                  <p className="text-lg">{friend?.fullName}</p>
                  <p className="text-[var(--primary-text)]/80">
                    {friend?.userName}
                  </p>
                </div>
                <div className="absolute bottom-1 right-2">
                  <ChevronRight />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
