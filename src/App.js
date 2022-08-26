// import React from "react";
import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import Navigation from "./components/Navigation";
import Router from "./Router";
import {
  collection,
  addDoc,
  writeBatch,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase-config";

import cars from "./cars.json";
import "./App.css";
import { FakeCarsContext } from "./Context/FakeCarsProvider";

function App() {
  const { setCarsData, user, setUser, userLikedCars, setUserLikedCars } =
    useContext(FakeCarsContext);
  //Class 8: Write a useEffect hook for onAuthStateChanged and set the user state.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser", currentUser);
      setUser(currentUser);
    });

    console.log("auth.currentUser", auth.currentUser);

    return unsubscribe;
    // We only want 1 instance of the user connected to
    //  the database this cleans up and disconnects the
    //  observer function when component is unmounted.
  }, []);

  useEffect(() => {
    const getCars = async () => {
      console.log(" const getCars = async");
      const documents = await getDocs(collection(db, "cars"));
      const documentData = documents.docs.map((document) => {
        return {
          ...document.data(),
          id: document.id,
        };
      });
      setCarsData(documentData);
    };
    getCars();
  }, []);

  useEffect(() => {
    const getUsersLikedCars = async () => {
      try {
        const userLikedCarsRef = collection(db, "userLikedCars");
        const q = query(userLikedCarsRef, where("userId", "==", user.uid));
        const queryResults = await getDocs(q);
        queryResults.forEach((doc) =>
          setUserLikedCars(doc.data().likedCarsIds)
        );
      } catch (error) {
        console.error("error getting Liked Cars", error);
      }
    };
    if (user?.uid != null) {
      getUsersLikedCars();
    } //  console.log("user",user);
  }, [user]);

  //Class 9: Using a useEffect hook, create a function that will query Firestore and save the results to state.

  //class 11:  Query `userLikedCars` collection for the matching document based on the user Id (uid).
  console.log("userfromapp", userLikedCars);

  return (
    <BrowserRouter>
      <Navigation user={user} />
      <Router user={user} />
    </BrowserRouter>
  );
}

export default App;
