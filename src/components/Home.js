import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  Query,
} from "firebase/firestore";
import { db } from "./../firebase-config";
import { FakeCarsContext } from "../Context/FakeCarsProvider";

const Home = () => {
  const { carsData, user, userLikedCars, setUserLikedCars } =
    useContext(FakeCarsContext);

  // useEffect(() => {}, [userLikedCars]);

  const handleAdd = async (carId) => {
    try {
      const userLikedCarsDocRef = doc(db, "userLikedCars", user.email);
      await updateDoc(userLikedCarsDocRef, {
        likedCarsIds: [...userLikedCars, carId],
      });
      setUserLikedCars([...userLikedCars, carId]);
    } catch (error) {
      console.error("error updating liked cars", error);
    }
  };

  const handleDelete = async (carId) => {
    try {
      const userLikedCarsDocRef = doc(db, "userLikedCars", user.email);

      await updateDoc(userLikedCarsDocRef, {
        likedCarsIds: userLikedCars.filter((liked) => liked !== carId),
      });
      setUserLikedCars(userLikedCars.filter((liked) => liked !== carId));
    } catch (error) {
      console.error("error updating liked cars", error);
    }
  };

  return (
    <>
      {/* <Query /> */}
      <div className="card-container">
        {carsData.map((car, idx) => (
          <Card key={idx} className="card">
            <CardContent className="text-gray">
              <Typography>{car.make.toUpperCase()}</Typography>
              <Typography>{car.model}</Typography>
              <ul>
                <li>Origin: {car["origin"]}</li>
                <li>MPG: {car["miles_per_gallon"]}</li>
                <li>Cylinders: {car["cylinders"]}</li>
                <li>Horsepower: {car["horsepower"]}</li>
              </ul>
            </CardContent>
            <Divider />
            <div>
              {userLikedCars.includes(car.id) ? (
                <FavoriteIcon
                  onClick={() => handleDelete(car.id)}
                  style={{ color: "red" }}
                />
              ) : (
                <FavoriteBorderIcon onClick={() => handleAdd(car.id)} />
              )}
            </div>
            <CardActions>
              <Link style={{ color: "mediumblue" }} to={`/car/${car.id}`}>
                See More Details
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
