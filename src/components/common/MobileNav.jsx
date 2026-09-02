import { House, Bookmark, CircleUserRound, Users } from "lucide-react";
import { NavLink } from "react-router";

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden flex justify-around gap-1 z-50 bg-[var(--surface)] border-t border-white/10 py-2">
      <NavLink
        to="/app"
        className={({
          isActive,
        }) => `flex flex-col items-center active:scale-95 text-sm
          ${isActive ? "text-[var(--accent)]" : "text-[var(--primary-text)]"}`}
      >
        <House size={30} />
        Home
      </NavLink>
      <NavLink
        to="/watchlist"
        className={({ isActive }) =>
          `flex flex-col items-center active:scale-95 text-sm ${isActive ? "text-[var(--accent)]" : "text-[var(--primary-text)]"}`
        }
      >
        <Bookmark size={30} />
        WatchList
      </NavLink>

      <NavLink
        to="/friends"
        className={({ isActive }) =>
          `flex flex-col items-center active:scale-95 text-sm ${isActive ? "text-[var(--accent)]" : "text-[var(--primary-text)]"}`
        }
      >
        <CircleUserRound size={30} />
        Friends
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center active:scale-95 text-sm ${isActive ? "text-[var(--accent)]" : "text-[var(--primary-text)]"}`
        }
      >
        <Users size={30} />
        Profile
      </NavLink>
    </div>
  );
}
