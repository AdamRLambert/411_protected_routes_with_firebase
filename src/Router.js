import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Home from "./components/Home";
import About from "./components/About";
import Car from "./components/Car";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

//Class 8: Write ProtectedRoute here
// It should navigate the user back to the login page if they are not logged in.
// Remember the user from  onAuthStateChanged returns null or an object
// use !! to check for falsy  !!null = false   !!{} = true

export const ProtectedRoute = (props) => {
  const { component: Component, ...rest } = props;
  const checkAuth = () => !!props.user;

  return checkAuth() === true ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

const Router = (props) => {
  const { user, carsData, setCarsData } = props;
  console.log("userfromrouter", user);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute user={user} component={Home} carsData={carsData} />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp user={user} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            user={user}
            carsData={carsData}
            component={Dashboard}
            setCarsData={setCarsData}
          />
        }
      />
      <Route
        path="/about"
        element={<ProtectedRoute user={user} component={About} />}
      />
      <Route
        path="/car/:id"
        element={
          <ProtectedRoute user={user} component={Car} carsData={carsData} />
        }
      />
    </Routes>
  );
};

export default Router;
