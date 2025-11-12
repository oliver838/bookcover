import React from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { auth } from "../fireBaseApp";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const MyUserContext = createContext();
export const MyUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [userReg, setUserReg] = useState(null);
  const [msg, setMsg] = useState({});
  useEffect(() => {
    const unsubscirbe = onAuthStateChanged(auth, (currentUser) => {
      currentUser?.emailVerified === true && setUser(currentUser);
    });
    return () => unsubscirbe();
  }, []);

  const signUpUser = async (email, password, display_name) => {
    console.log(email, password, display_name);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: display_name });
      await sendEmailVerification(auth.currentUser);
      console.log("email érkezik");
      console.log("sikeres regisztráció...");
      console.log(auth.currentUser);
      setUserReg(auth);
      setMsg({ err: "verify" });
    } catch (error) {
      console.log(error);
      setMsg({ err: error.message });
    }
  };

  const logOutUser = async () => {
    await signOut(auth);
    
    setMsg({});
    setUser(null)
  };
  const signInUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (auth.currentUser.emailVerified === true) {
        setMsg({ signIn: true });
        console.log("Sikeres bejelentkezés");
        setUser(auth);
      } else {
        setMsg({ err: "verify" });
      }
    } catch (error) {
      console.log(error);
      setMsg({ err: error.message });
    }
  };
  return (
    <div>
      <MyUserContext.Provider
        value={{ user, signUpUser, logOutUser, signInUser, msg, setMsg }}
      >
        {children}
      </MyUserContext.Provider>
    </div>
  );
};
