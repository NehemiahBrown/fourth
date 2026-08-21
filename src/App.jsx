import { BrowserRouter, Routes, Route } from "react-router";
import { createContext } from "react"
import SignUp from "./components/auth/SignUp";
import RootLayout from "./layouts/RootLayout";
import Home from "./components/common/Home";

export const AuthContext = createContext(null);

export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="signup" element={<SignUp/>} />
                <Route element={<RootLayout/>}>
                    <Route path="/app" element={<Home/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}