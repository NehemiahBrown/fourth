import { Outlet } from "react-router";

import PublicHeader from "../components/layout/PublicHeader";
import PublicFooter from "../components/layout/PublicFooter";

export default function PublicLayout(){
    return (
        <div className="w-full mx-auto max-w-lg">
            <PublicHeader/>

            <Outlet />
            
            <PublicFooter/>
        </div>
    )
}