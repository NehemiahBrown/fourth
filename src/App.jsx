import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AuthRequired } from "./layouts/AuthRequired.jsx";

import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Landing from "./components/auth/Landing";
import MovieDetailedView from "./components/common/MovieDetailedView.jsx";

import RootLayout from "./layouts/RootLayout";
import PublicLayout from "./layouts/PublicLayout";

import Home from "./components/common/Home";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
          </Route>
          <Route element={<AuthRequired />}>
            <Route element={<RootLayout />}>
              <Route path="/app" element={<Home />} />
              <Route path="/movie/:movieId" element={<MovieDetailedView />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
