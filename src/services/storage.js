import { storage } from "./firebase.js"
import { ref, uploadBytes } from "firebase/storage"

export async function upload(file, currentUser, setLoading){
    const fileRef = ref(storage, currentUser.uid + ".png");
    uploadBytes()
}