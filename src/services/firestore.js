import { db } from "./firebase.js"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 



export async function createUserDocument(uid, userData){
    console.log("UID received:", uid);
    console.log("User data received:", userData);
await setDoc(doc(db, "users", uid), {
    ...userData,
    createdAt: serverTimestamp()
  });
  console.log()
}
