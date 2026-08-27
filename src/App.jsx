import { BrowserRouter, Routes, Route } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase.js"
import { getAPI } from "./services/tmdb.js";

import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Landing from "./components/auth/Landing";

import RootLayout from "./layouts/RootLayout";
import PublicLayout from "./layouts/PublicLayout";

import Home from "./components/common/Home";

export default function App() {

  onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route path="/app" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
