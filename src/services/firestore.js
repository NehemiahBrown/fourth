import { db } from "./firebase.js";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export async function createUserDocument(uid, userData) {
  await setDoc(doc(db, "users", uid), {
    ...userData,
    createdAt: serverTimestamp(),
  });
}

export async function getUserDocument(uid) {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data();
  } else {
    console.log("No such document!");
  }
}
