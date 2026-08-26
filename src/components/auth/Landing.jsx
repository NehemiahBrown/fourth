import FourthLogo from "../../assets/fourthlogovert.png";
import { NavLink } from "react-router";

export default function Landing() {
  return (
    <main className="flex flex-col justify-center items-center min-h-dvh">
      <div>
        <img src={FourthLogo} alt="Fourth Logo." />
      </div>
      <div>
        <h1 className="text-4xl">JOIN THE FOURTH WALL</h1>
      </div>
      <div className="flex flex-col items-center gap-4 w-full mt-12">
        <NavLink
          to="/signup"
          className="flex justify-center items-center text-center h-[50px] w-[80%] bg-[var(--accent-dark)] rounded-xl active:bg-[var(--accent-dark)]/80 active:scale-98 transform-all duration-200"
        >
          Create Account
        </NavLink>
        <NavLink
          to="/login"
          className="flex justify-center items-center text-center h-[50px] w-[80%] bg-[var(--accent)] rounded-xl active:bg-[var(--accent)]/80 active:scale-98 transform-all duration-200"
        >
          Log In
        </NavLink>
      </div>
    </main>
  );
}
