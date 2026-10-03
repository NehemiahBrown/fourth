import { db } from "./firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
  query,
  where,
  limit,
  writeBatch,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { getUserProfilePictureURL } from "./storage.js";

export async function updateProfilePicture(uid, picture) {
  const userDocRef = doc(db, "users", uid);

  await updateDoc(userDocRef, {
    profilePicture: picture,
  });
}

// User Documents
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
    return {
      id: userDocSnap.id,
      ...userDocSnap.data(),
    };
  } else {
    console.log("No document exists.");
  }
}

// Watchlist Documents
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

export async function getMovieWatchListDocs(uid) {
  const watchListSnapshot = await getDocs(
    collection(db, "users", uid, "watchlist"),
  );
  return watchListSnapshot.docs.map((movie) => {
    return movie.data();
  });
}

// Favorite movie documents
export async function addMovieToFavorites(uid, movieData) {
  await setDoc(doc(db, "users", uid, "favoriteMovies", String(movieData.id)), {
    ...movieData,
  });
}

export async function deleteMovieFromFavorites(uid, movieId) {
  const favoriteMovieDocRef = doc(
    db,
    "users",
    uid,
    "favoriteMovies",
    String(movieId),
  );
  await deleteDoc(favoriteMovieDocRef);
}

export async function getFavoriteMoviesDoc(uid) {
  const favoriteMoviesDoc = await getDocs(
    collection(db, "users", uid, "favoriteMovies"),
  );

  return favoriteMoviesDoc.docs.map((movie) => {
    return movie.data();
  });
}

export async function getFriendsFavorites(array) {
  const friendsFavoriteMovies = await Promise.all(
    array.map((friend) => {
      return getFavoriteMoviesDoc(friend.id);
    }),
  );
  return friendsFavoriteMovies;
}

//Friends Documents

export async function getFriends(uid) {
  const friendsDocQuery = query(
    collection(db, "users", uid, "Friends"),
    limit(25),
  );

  const friendsDocs = await getDocs(friendsDocQuery);

  return friendsDocs.docs.map((friend) => {
    return {
      id: friend.id,
      ...friend.data(),
    };
  });
}

export async function findAFriend(userName) {
  const userNameQuery = query(
    collection(db, "users"),
    where("userNameLower", ">=", userName.toLowerCase()),
    where("userNameLower", "<=", userName.toLowerCase() + "\uf8ff"),
    limit(10),
  );

  const matchingUserNames = await getDocs(userNameQuery);

  return matchingUserNames.docs.map((friend) => {
    return {
      uid: friend.id,
      ...friend.data(),
    };
  });
}

export async function sendFriendRequest(currentUserId, requestedUserId) {
  if (currentUserId === requestedUserId) {
    return;
  }

  const batch = writeBatch(db);

  const outgoingRequestDoc = doc(
    db,
    "users",
    currentUserId,
    "outgoingRequests",
    requestedUserId,
  );
  const incomingRequestDoc = doc(
    db,
    "users",
    requestedUserId,
    "incomingRequests",
    currentUserId,
  );

  batch.set(outgoingRequestDoc, {
    friendRequest: "pending",
    createdAt: serverTimestamp(),
  });

  batch.set(incomingRequestDoc, {
    createdAt: serverTimestamp(),
  });

  await batch.commit();
}

export async function removeFriend(currentUserId, removedFriendId) {
  const batch = writeBatch(db);

  const userFriendDoc = doc(
    db,
    "users",
    currentUserId,
    "Friends",
    removedFriendId,
  );
  const friendRemovedDoc = doc(
    db,
    "users",
    removedFriendId,
    "Friends",
    currentUserId,
  );

  batch.delete(userFriendDoc);
  batch.delete(friendRemovedDoc);

  await batch.commit();
}

export async function acceptFriendRequest(currentUserId, requestSenderId) {
  const batch = writeBatch(db);

  const outgoingRequestDoc = doc(
    db,
    "users",
    requestSenderId,
    "outgoingRequests",
    currentUserId,
  );
  const incomingRequestDoc = doc(
    db,
    "users",
    currentUserId,
    "incomingRequests",
    requestSenderId,
  );

  const friendsDocCurrentUser = doc(
    db,
    "users",
    currentUserId,
    "Friends",
    requestSenderId,
  );
  const friendsDocRequestSender = doc(
    db,
    "users",
    requestSenderId,
    "Friends",
    currentUserId,
  );

  batch.set(friendsDocCurrentUser, {
    acceptedAt: serverTimestamp(),
  });

  batch.set(friendsDocRequestSender, {
    acceptedAt: serverTimestamp(),
  });

  batch.delete(outgoingRequestDoc);
  batch.delete(incomingRequestDoc);

  await batch.commit();
}

export async function declineFriendRequest(currentUserId, requestSenderId) {
  const batch = writeBatch(db);

  const outgoingRequestDoc = doc(
    db,
    "users",
    requestSenderId,
    "outgoingRequests",
    currentUserId,
  );
  const incomingRequestDoc = doc(
    db,
    "users",
    currentUserId,
    "incomingRequests",
    requestSenderId,
  );

  batch.delete(outgoingRequestDoc);
  batch.delete(incomingRequestDoc);

  await batch.commit();
}

export async function checkFriendStatus(currentUserId, requestedUserId) {
  const outgoingRequestDocRef = doc(
    db,
    "users",
    currentUserId,
    "outgoingRequests",
    requestedUserId,
  );
  const incomingRequestDocRef = doc(
    db,
    "users",
    currentUserId,
    "incomingRequests",
    requestedUserId,
  );
  const friendsDocRef = doc(
    db,
    "users",
    currentUserId,
    "Friends",
    requestedUserId,
  );

  const [outgoingRequestSnap, incomingRequestSnap, friendsDocSnap] =
    await Promise.all([
      getDoc(outgoingRequestDocRef),
      getDoc(incomingRequestDocRef),
      getDoc(friendsDocRef),
    ]);

  if (friendsDocSnap.exists()) {
    return "Friends";
  } else if (outgoingRequestSnap.exists()) {
    return "Requested";
  } else if (incomingRequestSnap.exists()) {
    return "Confirm";
  } else {
    return "Add Friend";
  }
}

export function listenForFriendRequests(currentUserId, callback) {
  const friendRequestsDoc = collection(
    db,
    "users",
    currentUserId,
    "incomingRequests",
  );

  const unsubscribe = onSnapshot(friendRequestsDoc, (snapshot) => {
    const requests = snapshot.docs.map((request) => {
      return {
        senderId: request.id,
        ...request.data(),
      };
    });
    callback(requests);
  });

  return unsubscribe;
}

export function listenForNewFriends(currentUserId, callback) {
  const friendsDoc = collection(db, "users", currentUserId, "Friends");

  const unsubscribe = onSnapshot(friendsDoc, (snapshot) => {
    const friends = snapshot.docs.map((friend) => {
      return {
        id: friend.id,
        ...friend.data(),
      };
    });
    callback(friends);
  });
  return unsubscribe;
}
