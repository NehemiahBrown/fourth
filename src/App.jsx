import { BrowserRouter, Routes, Route } from "react-router";
import SignUp from "./components/auth/SignUp";


export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="signup" element={<SignUp/>} />
            </Routes>
        </BrowserRouter>
    )
}