import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase.js";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LogIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function signUserIn(e) {
    e.preventDefault();
    setErrorMessage("");

    const userEmail = e.target.userEmail.value;
    const userPassword = e.target.userPassword.value;
    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("logged in");
          navigate("/app");
        })
        .catch((error) => {
          console.log("Error: ", error.message);
        });
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-12 px-10 py-6 min-h-dvh">
        <div className=" flex flex-col gap-2 text-center">
          <h1 className="text-4xl">LOGIN TO YOUR ACCOUNT</h1>
        </div>

        <form
          onSubmit={signUserIn}
          action=""
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex flex-col gap-1">
            <label className="block" htmlFor="userEmail">
              EMAIL
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              className="pl-[5px] h-[40px] w-full bg-[var(--surface)]  border border-white/5 border-b-white/15 shadow-[var(--shadow-input)]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block" htmlFor="userPassword">
              PASSWORD
            </label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className="pl-[5px] h-[40px] w-full bg-[var(--surface)]  border border-white/5 border-b-white/15 shadow-[var(--shadow-input)]"
            />
          </div>

          <div className="mt-4 flex flex-col gap-2 w-full">
            <button
              type="submit"
              className="mx-auto h-[50px] w-full max-w-[400px] bg-[var(--accent-dark)] rounded-xl hover:bg-[var(--accent-dark)]/80 active:bg-[var(--accent-dark)]/80 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Log In
            </button>
            <p className="text-xs text-center">
              Don't have an account? <span>Sign up</span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
