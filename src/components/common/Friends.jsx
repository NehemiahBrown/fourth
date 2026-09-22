import { Search } from "lucide-react";

import { findAFriend } from "../../services/firestore";

import { useState, useEffect } from "react";

export default function Friends() {
  const [friendInputValue, setFriendInputValue] = useState("");
  const [friendSearchResults, setFriendSearchResults] = useState([]);

  function captureFriendInputValue(e) {
    setFriendInputValue(e.target.value);
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (friendInputValue.length >= 2) {
        const results = await findAFriend(friendInputValue);
        setFriendSearchResults(results);
      } else {
        setFriendSearchResults([]);
      }
    };
    fetchSearchResults();
  }, [friendInputValue]);

  console.log(friendSearchResults);

  return (
    <main>
      <div className="flex flex-col mx-auto w-[98%]">
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
                <div key={friend.uid}>
                  <div className="flex gap-2 items-center">
                    <img
                      className="w-[30px] h-[30px] rounded-md"
                      src={friend?.profilePicture}
                      alt=""
                    />
                    <p className="text-[var(--secondary-text)]">
                      {friend?.userName}
                    </p>{" "}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
