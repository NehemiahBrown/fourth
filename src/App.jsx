import { BrowserRouter, Routes, Route } from "react-router";
import { createContext } from "react"

import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";

import RootLayout from "./layouts/RootLayout";
import PublicLayout from "./layouts/PublicLayout";

import Home from "./components/common/Home";

export const AuthContext = createContext(null);

export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout/>}> 
                    <Route path="signup" element={<SignUp/>} />
                    <Route path="login" element={<LogIn/>}/>
                </Route>
                <Route element={<RootLayout/>}>
                    <Route path="/app" element={<Home/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}