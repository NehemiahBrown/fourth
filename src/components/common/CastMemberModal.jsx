import { useParams } from "react-router";
import { ChevronLeft } from 'lucide-react';

export default function CastMemberModal(){

    

    return (
        <div className="fixed inset-0 z-1000 bg-[var(--background)]">
            <div><ChevronLeft size={40}/></div>
        </div>
    )
}