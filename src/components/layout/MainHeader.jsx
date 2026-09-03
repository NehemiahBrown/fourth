import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useRef } from "react";
import { useNavigate, NavLink } from "react-router";

import { X } from "lucide-react";
import { useClickOutside } from "../../hooks/clickOutsideDiv.js";
import FourthLogoHorz from "../../assets/fourthlogohorz.png";

export default function MainHeader() {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);
  const navigate = useNavigate();
  const { logOut, currentUser, userProfile } = useAuth();

  function handleDropDown() {
    setDropDownOpen((current) => !current);
  }

  function closeDropDown() {
    setDropDownOpen(false);
  }

  useClickOutside(dropDownRef, closeDropDown);

  function signUserOut() {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <header className="flex items-center justify-between py-3 px-2 shadow-[var(--shadow-bottom)]">
      <div className="flex gap-2 items-center">
        <NavLink to="/app">
          <img
            src={FourthLogoHorz}
            alt="Fourth Logo"
            className="w-[7rem] h-[3rem]"
          />
        </NavLink>
      </div>
      <div
        onClick={handleDropDown}
        ref={dropDownRef}
        className="relative flex items-center justify-center border-2 border-[var(--accent-dark)] px-2 py-2 w-[40px] h-[40px] rounded-full cursor-pointer"
      >
        <button className="cursor-pointer">
          <p>{userProfile?.fullName.substring(0, 1)}</p>
        </button>
        {dropDownOpen && (
          <div className="fixed sm:absolute sm:right-full bg-[var(--surface)] top-0 sm:top-8 left-0 sm:left-auto w-[100vw] sm:w-[400px] h-[100dvh] sm:h-auto z-20000 rounded-lg">
            <div className="sm:hidden">
              <X />
            </div>
            <NavLink
              to="/profile"
              className="block mt-6 sm:mt-0 border-b border-white/15 w-full text-left py-4 px-2 text-lg hover:bg-[var(--accent-dark)] hover:text-[var(--primary-text)] active:scale-98 hover:rounded-t-lg transition-all duration-200 cursor-pointer"
            >
              Profile
            </NavLink>
            <NavLink
              to="watchlist"
              className="block border-b border-white/15 w-full text-left py-4 px-2 text-lg hover:bg-[var(--accent-dark)] hover:text-[var(--primary-text)] active:scale-98 transition-all duration-200 cursor-pointer"
            >
              Watchlist
            </NavLink>
            <NavLink
              to="friends"
              className="block border-b border-white/15 w-full text-left py-4 px-2 text-lg hover:bg-[var(--accent-dark)] hover:text-[var(--primary-text)] active:scale-98 transition-all duration-200 cursor-pointer"
            >
              Friends
            </NavLink>
            <button
              onClick={signUserOut}
              className="border-b border-white/15 w-full text-left py-4 px-2 text-lg hover:bg-[var(--accent-dark)] hover:text-[var(--primary-text)] active:scale-98 transition-all duration-200 cursor-pointer"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
