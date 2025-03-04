import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Chip } from "@mui/material";
import carsData from "../cars.json";
import EditCar from "./EditCar";

// Don't forget to pass along (props) as the parameter
const Car = (props) => {
  const { carsData } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const id = useParams().id;
  // Change "carsData" to "props.carsData
  const car = carsData.find((c) => c.id === id);

  return (
    <Container maxWidth="sm" className="car-container">
      <Paper className="car-paper">
        <h2>{car?.make}</h2>
        <h3>{car?.model}</h3>
        <div>
          {Object.keys(car).map((key, idx) => {
            return (
              <Chip
                style={{ margin: "5px" }}
                key={idx}
                label={`${key}: ${car[key]}`}
              ></Chip>
            );
          })}
          <EditCar carsData={carsData} carId={id} />
        </div>
      </Paper>
    </Container>
  );
};

export default Car;
