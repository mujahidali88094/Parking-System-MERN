import { Grid, Card, CardContent, Typography, Button, Stack } from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllParkingAreasApi } from "../common/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { setBookingState } from "../redux/bookingSlice";
import { displayNotification } from "../redux/notificationSlice";
import AddParkingAreaDialog from "../components/AddParkingAreaDialog";
import UpdateParkingAreaDialog from "../components/UpdateParkingAreaDialog";
import DeleteParkingAreaDialog from "../components/DeleteParkingAreaDialog";

export default function ParkingAreas() {

  const [parkingAreas, setParkingAreas] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);

  const { parkingArea } = useSelector((state) => state.booking);
  const selectedParkingArea = parkingArea;

  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const fetchParkingAreas = useCallback(() => {
    getAllParkingAreasApi().then((res) => {
      setParkingAreas(res);
    }).catch((err) => {
      dispatch(displayNotification({ message: String(err), type: "error" }));
    });
  }, [dispatch]);

  React.useEffect(() => {
    fetchParkingAreas();
  }, [fetchParkingAreas]);

  const handleUpdateClick = (parkingArea) => {
    dispatch(setBookingState({ parkingArea: parkingArea }));
    setUpdateDialogOpen(true);
  };

  const handleDeleteClick = (parkingArea) => {
    dispatch(setBookingState({ parkingArea: parkingArea }));
    setDeleteDialogOpen(true);
  };

  const handleExploreClick = (parkingArea) => {
    dispatch(setBookingState({ parkingArea: parkingArea }));
    navigate(`/pickSlot`);
  };

  return (
    <div>
      <h2>Parking Areas</h2>
      <div style={{ marginBlock: 10 }}>
        {loginState.user?.role == "admin" && (
          <Button onClick={() => { setAddDialogOpen(true); }} variant="contained">
            Add New
          </Button>
        )}
      </div>
      <Grid container spacing={4}>
        {parkingAreas.map((parkingArea) => {
          return (
            <Grid item key={parkingArea._id}>
              <Card>
              <CardContent style={{padding:20}}>
                <Typography variant="h5" component="div" style={{marginBottom: '20px'}}>
                  {parkingArea.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Capacity: {parkingArea.capacity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price per Hour: {parkingArea.pricePerHour}
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
                <Stack mt={2} spacing={2} direction={'row'} justifyContent={'center'}>
                    {loginState.user?.role == "admin" && (
                      <>
                        <Button variant="contained" onClick={() => { handleUpdateClick(parkingArea); }}>Update</Button>
                        <Button variant="contained" color="error" onClick={() => { handleDeleteClick(parkingArea); }}>Delete</Button>
                      </>
                    )}
                    {loginState.user?.role == "user" && (
                      <Button variant="contained" onClick={() => { handleExploreClick(parkingArea); }}>Explore</Button>
                    )}
                </Stack>
              </CardContent>
            </Card>
            </Grid>
          )
        })}
      </Grid>
      <AddParkingAreaDialog open={addDialogOpen} handleClose={() => { setAddDialogOpen(false); fetchParkingAreas(); }} />
      <UpdateParkingAreaDialog open={updateDialogOpen} handleClose={() => { setUpdateDialogOpen(false); fetchParkingAreas(); }} parkingArea={selectedParkingArea} />
      <DeleteParkingAreaDialog open={deleteDialogOpen} handleClose={() => { setDeleteDialogOpen(false); fetchParkingAreas(); }} parkingArea={selectedParkingArea} />
    </div>
  );
}