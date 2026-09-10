import UserAvatar from "../../assets/userAvatar.png"
import ProfilePictureModal from "./ProfilePictureModal.jsx"

import { useAuth } from "../../context/AuthContext.jsx";

import {useState, useEffect} from "react";



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
    <div>
      <div onClick={openModal} className="flex justify-center items-center cursor-pointer">
        <img className="w-[120px] h-[120px] rounded-full" src={userProfile?.profilePicture || UserAvatar} alt="Profile Picture" />
      </div>
      { showModal && <ProfilePictureModal closeModal={closeModal}/> }
    </div>
  )
}
