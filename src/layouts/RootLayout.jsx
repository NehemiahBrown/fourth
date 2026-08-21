import { Outlet } from "react-router";

import MainHeader from "../components/layout/MainHeader";
import MainFooter from "../components/layout/MainFooter";

export default function RootLayout(){
    return (
        <div>
            <MainHeader/>

            <Outlet/>
            
            <MainFooter/>
        </div>
    )
}