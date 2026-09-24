import {useParams} from "react-router";
import { useEffect, useState } from "react";
import { getUserDocument, getFavoriteMoviesDoc, getMovieWatchListDocs } from "../../services/firestore.js"

import { Ellipsis } from "lucide-react"
export default function SearchedUserProfile(){
    const { userId } = useParams();

    const [userData, setUserData] = useState({})
    const [friends, setFriends] = useState([])
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            
         const [user, favorites, watchlist] = await Promise.all([
                getUserDocument(userId),
                getFavoriteMoviesDoc(userId),
                getMovieWatchListDocs(userId),
            ])
            
            setUserData({
                user,
                favorites,
                watchlist
            })
        }
        fetchUserProfile()
    }, [userId])

    console.log(userData)

    return (
        <main>
            <div className="flex gap-4">
                <div className="mt-2">
                    <img src={userData?.user?.profilePicture} alt={`${userData?.user?.userName} profile picture.`} className="w-[100px] h-[100px] rounded-full"/>
                </div>
                <div>
                    <p className="text-3xl font-bold">{userData?.user?.fullName}</p>
                    <p className=" text-lg text-[var(--primary-text)]/80">{`@${userData?.user?.userName}`}</p>
                    <div className="mt-2 flex gap-2">
                        <button className="bg-[var(--accent-dark)] px-6 py-2 rounded-md text-lg font-bold">Add Friend</button>
                        <button className="bg-[var(--accent)] px-6 py-2 rounded-md text-lg font-bold"><Ellipsis/></button>
                    </div>
                </div>
            </div>
            <div className="mt-12 flex gap-4 justify-around py-4 border-y border-[var(--accent)]/20">
                <div className="flex flex-col items-center">
                    <p className="text-4xl font-bold">{friends.length}</p>
                    <p className="text-lg">Friends</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-4xl font-bold">{userData?.favorites?.length}</p>
                    <p className="text-lg">Favorites</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-4xl font-bold">{userData?.watchlist?.length}</p>
                    <p className="text-lg">Watchlist</p>
                </div>
            </div>
        </main>
    )
}