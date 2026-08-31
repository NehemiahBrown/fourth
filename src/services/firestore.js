import { db } from "./firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

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
    console.log("No document exists.");
  }
}

export async function addMovieToWatchList(uid, movieData) {
  const watchListMovieDocRef = doc(
    db,
    "users",
    uid,
    "watchlist",
    String(movieData.id),
  );

  await setDoc(watchListMovieDocRef, {
    ...movieData,
    addedAt: serverTimestamp(),
  });
}

export async function deleteMovieFromWatchList(uid, movieId) {
  const watchListMovieDocRef = doc(
    db,
    "users",
    uid,
    "watchlist",
    String(movieId),
  );

  await deleteDoc(watchListMovieDocRef);
}
