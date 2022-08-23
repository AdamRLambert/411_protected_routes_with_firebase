import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import { auth } from "../firebase-config";
import SelectUserRole from "./SelectUserRole";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
// import utilityfunction from "./../utils/utilityFunctions";
import { createRole } from "../utils/utilityFunctions";
import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import { db } from "./../firebase-config";

const SignUp = () => {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [userRole, setUserRole] = useState(null);
  const userLikedCarsRef = collection(db, "userLikedCars");

  const createLikedCars = async (user) => {
    console.log("!!!!!", user);
    await setDoc(doc(db, "userLikedCars", user.user.email), {
      userId: user.user.uid,
      likedCarsIds: [],
    });
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      createRole(userCredential, userRole);
      createLikedCars(userCredential);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Class 10:
  // const handleSelectUserRole = (role) => {
  //   setUserRole(role);
  // };

  return (
    <div className="App">
      <Container maxWidth="sm">
        <form className="login-form" onSubmit={signUp}>
          <SelectUserRole setUserRole={setUserRole} />
          <TextField
            required
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
            value={registerEmail}
            name="Email"
            label="Email"
            type="text"
          />
          <TextField
            required
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
            value={registerPassword}
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            className="login-button"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </form>
      </Container>
    </div>
  );
};
export default SignUp;
