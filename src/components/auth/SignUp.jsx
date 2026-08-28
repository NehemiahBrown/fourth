import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase.js";
import { createUserDocument } from "../../services/firestore.js";

import { useState } from "react";
import { useNavigate } from "react-router";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function createNewUser(e) {
    e.preventDefault();
    setErrorMessage("");

    let email = e.target.newEmail.value;
    let password = e.target.newPassword.value;
    let fullName = e.target.newName.value;
    let userName = e.target.newUsername.value;

    const userData = {
      fullName,
      userName,
      email,
  }
  console.log("Use data:", userData)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          createUserDocument(user.uid, userData)
        })
        .then(() => {
          navigate("/app");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-8 px-10 py-6 min-h-dvh">
        <div className=" flex flex-col gap-2 text-center">
          <h1 className="text-4xl">CREATE AN ACCOUNT</h1>
          <p className="text-md">YOUR SIDE OF THE FOURTH WALL</p>
        </div>

        <form
          onSubmit={createNewUser}
          action=""
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex flex-col gap-1">
            <label className="block" htmlFor="newName">
              FULL NAME
            </label>
            <input
              type="text"
              id="newName"
              name="newName"
              className="pl-[5px] h-[40px] w-full bg-[var(--surface)] border border-white/5 border-b-white/15 shadow-[var(--shadow-input)]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block" htmlFor="newUsername">
              USERNAME
            </label>
            <input
              type="text"
              id="newUsername"
              name="newUsername"
              className="pl-[5px] h-[40px] w-full bg-[var(--surface)]  border border-white/5 border-b-white/15 shadow-[var(--shadow-input)]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block" htmlFor="newEmail">
              EMAIL
            </label>
            <input
              type="email"
              id="newEmail"
              name="newEmail"
              className="pl-[5px] h-[40px] w-full bg-[var(--surface)]  border border-white/5 border-b-white/15 shadow-[var(--shadow-input)]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block" htmlFor="newPassword">
              PASSWORD
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="pl-[5px] h-[40px] w-full bg-[var(--surface)]  border border-white/5 border-b-white/15 shadow-[var(--shadow-input)]"
            />
          </div>

          <div className="mt-4 flex flex-col gap-2 w-full">
            <button
              type="submit"
              className="mx-auto h-[50px] w-full max-w-[400px] bg-[var(--accent-dark)] rounded-xl hover:bg-[var(--accent-dark)]/80 active:bg-[var(--accent-dark)]/80 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Create Account
            </button>
            <p className="text-xs text-center">
              Already have an account? <span>Log in</span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
