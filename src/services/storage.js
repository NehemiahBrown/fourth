import { storage } from "./firebase.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export async function upload(file, currentUser){
    const storageRef = ref(storage, "profilePictures/" + currentUser.uid + "/profilePicture.png")
        await uploadBytes(storageRef, file)
        console.log("uploaded image")  
}

export async function getUserProfilePictureURL(currentUser){
   try {
    const profilePicture =  await getDownloadURL(ref(storage, "profilePictures/" + currentUser.uid + "/profilePicture.png"))
    return profilePicture 
      } catch(error) {
      console.log("Error: ", error.message)
    };
}
