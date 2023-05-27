import { Grid, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getAllParkingAreasApi } from "../common/axiosClient";
import { useDispatch } from "react-redux";
import { setBookingState } from "../redux/bookingSlice";

export default function ParkingAreas() {

  const [parkingAreas, setParkingAreas] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    getAllParkingAreasApi().then((res) => {
      setParkingAreas(res);
    }).catch((err) => {
      alert(err);
    });
  }, []);

  const handleCardClick = (parkingArea) => {
    dispatch(setBookingState({parkingArea: parkingArea}));
    navigate(`/pickSlot`);
  };

  return (
    <div>
      <h2>Parking Areas</h2>
      <Grid container spacing={4}>
        {parkingAreas.map((parkingArea) => {
          return (
            <Grid item key={parkingArea._id}>
              <Card onClick={() => { handleCardClick(parkingArea); }}>
              <CardContent style={{padding:20}}>
                <Typography variant="h5" component="div" style={{marginBottom: '20px'}}>
                  {parkingArea.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Capacity: {parkingArea.capacity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Latitude: {parkingArea.lat}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Longitude: {parkingArea.lng}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {parkingArea.address}
                </Typography>
              </CardContent>
            </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
}