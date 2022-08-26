import React, { createContext, useState } from "react";

// Create two context:
// ReadLikedCarsContext: to query the context state
// SetLikedCarsContext: to mutate the context state
const FakeCarsContext = createContext();

// A "provider" is used to denote a component that passes its props
// all the way down the component tree.
function FakeCarsProvider({ children }) {
  //Class 8: For Firebase user authentication from onAuthStateChanged
  const [user, setUser] = useState({});

  //Class 9: Create a useState hook to store the data we Read from Firestore
  const [carsData, setCarsData] = useState([]);
  const [userLikedCars, setUserLikedCars] = useState([]);

  const value = {
    user,
    setUser,
    carsData,
    setCarsData,
    userLikedCars,
    setUserLikedCars,
  };

  return (
    <FakeCarsContext.Provider value={value}>
      {children}
    </FakeCarsContext.Provider>
  );
}
export { FakeCarsContext, FakeCarsProvider };
