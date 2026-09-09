import UserAvatar from "../../assets/userAvatar.png"
import ProfilePictureModal from "./ProfilePictureModal.jsx"
import {useState} from "react"

export default function Profile() {
  const [showModal, setShowModal] = useState(false)
 
  function openModal(){
    setShowModal(true)
  }

  function closeModal(){
    setShowModal(false)
  }
  return (
    <div>
      <div onClick={openModal} className="flex justify-center items-center cursor-pointer">
        <img className="w-[120px] h-[120px] rounded-full" src={UserAvatar} alt="Profile Picture" />
      </div>
      { showModal && <ProfilePictureModal closeModal={closeModal}/> }
    </div>
  )
}
