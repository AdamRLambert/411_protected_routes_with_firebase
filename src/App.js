// import React from "react";
import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import Navigation from "./components/Navigation";
import Router from "./Router";

import "./App.css";

function App() {
  //Class 8: For Firebase user authentication from onAuthStateChanged
  const [user, setUser] = useState({});
  const [logIn, setLogIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLogIn(true);
      } else if (!user) {
        setUser({});
        setLogIn(false);
      }
    });
  }, []);

  //Class 9: Create a useState hook to store the data we Read from Firestore
  // const [carsData, setCarsData] =

  //Class 8: Write a useEffect hook for onAuthStateChanged and set the user state.

  //Class 9: Using a useEffect hook, create a function that will query Firestore and save the results to state.

  //class 11:  Query `userLikedCars` collection for the matching document based on the user Id (uid).
  console.log("user", user, "login", logIn);
  return (
    <BrowserRouter>
      <Navigation user={user} logIn={logIn} />
      <Router user={user} />
    </BrowserRouter>
  );
}

export default App;
