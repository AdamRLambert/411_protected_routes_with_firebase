import React, { useState } from "react";
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
} from "firebase/firestore";
import { db } from "./../firebase-config";

const Home = (props) => {
  const { carsData, setCarsData, user } = props;
  const [selectedId, setSelectedId] = useState("");

  const toggleFavorite = async (carId) => {
    console.log("heartID", carId);

    try {
      const userLikedCarsDocRef = doc(db, "userLikedCars", user.email);
      await updateDoc(userLikedCarsDocRef, {
        likedCarsIds: arrayUnion(carId),
      });
      console.log("****", carId);
      setSelectedId(carId);
    } catch (error) {
      console.error("error updating liked cars", error);
    }
  };

  const handleAdd = async (carId) => {};

  const handledelete = async (id) => {};

  console.log("hearts", user);

  return (
    <>
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
            <div onClick={() => toggleFavorite(car.id)}>
              {selectedId === car.id ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
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
