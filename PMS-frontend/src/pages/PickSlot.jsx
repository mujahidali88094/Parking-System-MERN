import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { TextField, Button, Grid, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { displayNotification } from "../redux/notificationSlice";
import { setBookingState } from "../redux/bookingSlice";
import { getBookingsApi } from "../common/axiosClient";
import { useNavigate } from "react-router-dom";

export default function PickSlot() {

  const booking = useSelector((state) => state.booking);
  const [showSlots, setShowSlots] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      startTime: '',
      endTime: '',
    },
    onSubmit: (values) => {
      if (values.startTime < new Date() || values.endTime < new Date()) {
        alert("Selected DateTimes Cannot be in the Past");
        setShowSlots(false);
        return;
      }

      if (values.startTime > values.endTime) {
        alert("Start time cannot be greater than end time");
        setShowSlots(false);
        return;
      }
      setShowSlots(true);
      dispatch(setBookingState({ startTime: values.startTime, endTime: values.endTime }));
    },
  });


  return (
    <div>
      <h2>Pick Slot</h2>
      {
        !booking.parkingArea
          ? <h3>Please select a parking area first</h3>
          : <Grid container style={{justifyContent: 'space-evenly'}}>
            <Grid item>
              <h3>{booking.parkingArea.name}</h3>
              <h5>Capacity: {booking.parkingArea.capacity}</h5>
              <h5>Address: {booking.parkingArea.address}</h5>
            </Grid>
            <Grid item>
              <h3>Select Time and Date</h3>
              <form onSubmit={formik.handleSubmit}>
                <TextField id="startTime" name="startTime" label="From" 
                  type="datetime-local" required style={{ marginBlock: 5 }} InputLabelProps={{ shrink: true, }}
                  onChange={formik.handleChange} value={formik.values.startTime}
                />
                <br />
                <TextField id="endTime" name="endTime" label="To"
                  type="datetime-local" required style={{ marginBlock: 5 }}  InputLabelProps={{ shrink: true, }}
                  onChange={formik.handleChange} value={formik.values.endTime}
                />
                <br />
                <Button type="submit" variant="contained" style={{ marginBlock: 5 }}>Check</Button>
              </form>
            </Grid>
          </Grid>
      }
      {
        showSlots
          ? <Slots />
          : null
      }
    </div>
  );
}

const Slots = () => {
  const {parkingArea, startTime, endTime} = useSelector((state) => state.booking);
  const [slots, setSlots] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const discoverSlots = async () => {
      try {
        const bookings = await getBookingsApi(parkingArea._id, startTime, endTime);
        const bookedSlots = bookings.map((booking) => booking.slot);

        let slots = Array.from({ length: parkingArea.capacity }, (_, i) => {
          return {
            slotNumber: i + 1,
            booked: bookedSlots.includes(i + 1),
          }
        });
        setSlots(slots);

      } catch (err) {
        dispatch(displayNotification({ message: String(err), type: "error" }));
      }
    };
    if(parkingArea && startTime && endTime)
      discoverSlots();
  }, [dispatch, parkingArea, startTime, endTime]);

  const handleSlotClick = (slotNumber) => {
    dispatch(setBookingState({ slotNumber }));
    navigate("/book");
  }

  return (
    <div>
      <h2>Slots</h2>
      <Grid container spacing={4}>
        {slots.map((slot) => (
          <Grid item key={slot.slotNumber}>
            <Card style={{ color: "white", backgroundColor: slot.booked ? "red" : "green", cursor: "pointer" }}
              onClick={() => handleSlotClick(slot.slotNumber)} 
            >
              <CardContent style={{ padding: 20 }}>
                <Typography variant="h5" component="div">
                  {slot.slotNumber}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {slot.booked ? "Booked" : "Available"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </ Grid>
    </div>
  );
}