import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
} from "@mui/material";

import Query from "./Query";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Home = (props) => {
  const { carsData, setCarsData } = props;
  const toggleFavorite = async (carId) => {};

  const handleAdd = async (carId) => {};

  const handledelete = async (id) => {};

  console.log("hearts", carsData);

  return (
    <>
      <Query />
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
              <FavoriteIcon style={{ color: "red" }} />
              <FavoriteBorderIcon />
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
