import { storage } from "./firebase.js"
import { ref, uploadBytes } from "firebase/storage"

export async function upload(file, currentUser){
    const storageRef = ref(storage, "profilePictures/" + currentUser.uid + "/profilePicture.png")
        await uploadBytes(storageRef, file)
        console.log("uploaded image")  
}