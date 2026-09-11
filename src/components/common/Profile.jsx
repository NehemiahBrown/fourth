import UserAvatar from "../../assets/userAvatar.png"
import ProfilePictureModal from "./ProfilePictureModal.jsx"

import { useAuth } from "../../context/AuthContext.jsx";
import {useState, useEffect} from "react";

import { Camera } from "lucide-react"



export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const { currentUser, userProfile } = useAuth();

  function openModal(){
    setShowModal(true)
  }

  function closeModal(){
    setShowModal(false)
  }
  return (
    <div className="flex justify-center">
      <div onClick={openModal} className="relative w-fit h-auto cursor-pointer">
        <img className="w-[120px] h-[120px] rounded-full" src={userProfile?.profilePicture || UserAvatar} alt="Profile Picture" />
        <Camera size={30} className="absolute bottom-0 right-0 bg-[var(--accent-dark)] p-1 rounded-full"/>
      </div>
      { showModal && <ProfilePictureModal closeModal={closeModal}/> }
    </div>
  )
}
