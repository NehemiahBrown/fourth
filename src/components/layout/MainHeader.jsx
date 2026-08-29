import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";

import { useClickOutside } from "../../hooks/clickOutsideDiv.js";
import FourthIcon from "../../assets/fourthicon.png";

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
    <header className="flex justify-between py-3 px-2 shadow-[var(--shadow-bottom)]">
      <div className="flex gap-2 items-center">
        <img src={FourthIcon} alt="Fourth Logo" className="w-[3rem] h-[3rem]" />
        <p className="text-xl font-bold">Home</p>
      </div>
      <div
        ref={dropDownRef}
        className="relative flex items-center justify-center border-2 border-[var(--accent-dark)] px-2 py-2 rounded-full cursor-pointer"
      >
        <button onClick={handleDropDown}>
          <p>{userProfile?.fullName.substring(0, 1)}</p>
        </button>
        {dropDownOpen && (
          <div className="fixed sm:absolute sm:right-full bg-[var(--surface)] top-0 sm:top-14 left-0 sm:left-auto w-[100vw] sm:w-[400px] h-[100dvh] sm:h-[500px] z-20000 rounded-lg">
            <button
              onClick={signUserOut}
              className="border-b border-white/15 w-full text-left py-4 px-2 text-lg hover:bg-[var(--accent-dark)] hover:text-[var(--primary-text)] active:scale-98 hover:rounded-t-lg transition-all duration-200 cursor-pointer"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
