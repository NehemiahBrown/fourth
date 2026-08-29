import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../services/firebase.js";
import { getUserDocument } from "../services/firestore.js";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // holds firebase user authentication data
  const [currentUser, setCurrentUser] = useState(null);
  // holds custom user profile data from firestore
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    setCurrentUser(null);
    setUserProfile(null);
    return signOut(auth);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userDocumentData = await getUserDocument(user.uid);
        setUserProfile(userDocumentData);
        setIsLoading(false);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const userData = {
    currentUser,
    userProfile,
    logIn,
    logOut,
    signUp,
    isLoading,
  };

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
}
