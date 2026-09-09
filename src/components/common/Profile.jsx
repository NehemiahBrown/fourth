import UserAvatar from "../../assets/userAvatar.png"
import ProfilePictureModal from "./ProfilePictureModal.jsx"
import {useState, useEffect} from "react"
import { useAuth } from "../../context/AuthContext.jsx";


export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [photoUrl, setPhotoUrl] = useState()
  const { currentUser } = useAuth();

  useEffect(() => {
    setPhotoUrl(currentUser.photoUrl || UserAvatar)
  }, [currentUser])

  function openModal(){
    setShowModal(true)
  }

  function closeModal(){
    setShowModal(false)
  }
  return (
    <div>
      <div onClick={openModal} className="flex justify-center items-center cursor-pointer">
        <img className="w-[120px] h-[120px] rounded-full" src={photoUrl} alt="Profile Picture" />
      </div>
      { showModal && <ProfilePictureModal closeModal={closeModal}/> }
    </div>
  )
}
