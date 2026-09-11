import { X, ImageUp } from "lucide-react"
import { upload } from "../../services/storage.js";
import { useAuth } from "../../context/AuthContext.jsx";
import {useState} from "react";
import {updateProfilePicture} from "../../services/firestore.js"
import {getUserProfilePictureURL} from "../../services/storage.js"


export default function ProfilePictureModal({closeModal}){
    const {currentUser, refreshProfile} = useAuth();
    const [profilePicture, setProfilePicture] = useState(null)
    const [profilePicturePreview, setProfilePicturePreview] = useState(null)

    function addProfilePicture(e){
        const picturePreview = URL.createObjectURL(e.target.files[0])
        setProfilePicture(e.target.files[0])
        setProfilePicturePreview(picturePreview)

    }

    async function uploadPhoto(){
        if(!profilePicture){
            return
        }
        await upload(profilePicture, currentUser)
        const profilePictureURL = await getUserProfilePictureURL(currentUser)
       await updateProfilePicture(currentUser.uid, profilePictureURL)
        await refreshProfile();
        closeModal()
    }

    return (
        <div className="fixed flex justify-center items-center inset-0 bg-[var(--surface)]/70 z-100000 backdrop-blur-sm">
            <div className="flex flex-col gap-6 w-[80%] max-w-[500px] p-4 bg-white text-[var(--secondary-text)]">
                <div className="flex justify-between items-center">
                    <p className="text-xl">Upload a profile picture</p>
                    <X onClick={closeModal} className="cursor-pointer hover:bg-[var(--surface)] hover:text-[var(--primary-text)] transform-all duration-200"/>
                </div>
                <div> 
                   { profilePicturePreview ? <div><img src={profilePicturePreview} alt="Profile picture preview" /></div> : <label className="block cursor-pointer rounded-xl border border-dashed p-6 text-center">
                         <div className="flex flex-col justify-center items-center gap-2 py-4">
                            <p className="text-lg">Choose an image</p>
                            <ImageUp/>
                            <p className="text-sm">PNG, JPG, WEBP</p>
                         </div>
                        <input onChange={addProfilePicture} type="file" accept="image/png, image/jpeg, image/webp" className="hidden"/>
                    </label>}
                </div>
                <div className="flex gap-2 self-end">
                    <button onClick={uploadPhoto} className="bg-[var(--accent)] text-[var(--primary-text)]/80 hover:bg-[var(--accent)]/80 active:scale-98 p-1 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={!profilePicturePreview}>Upload</button>
                    <button onClick={closeModal} className="bg-[var(--accent)] text-[var(--primary-text)]/80 hover:bg-[var(--accent)]/80 active:scale-98 p-1 rounded-sm cursor-pointer" >Cancel</button>
                </div>

            </div>
        </div>
    )
}