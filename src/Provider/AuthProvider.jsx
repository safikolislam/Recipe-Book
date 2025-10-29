import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from "firebase/auth";

export const AuthContext = createContext();

export const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  // Create new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };


  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };


  const updateUser = (updatedData) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, updatedData);
    }
    return Promise.reject(new Error("No user is currently signed in."));
  };


  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    loading,
    setUser,
    createUser,
    signIn,
    logOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
