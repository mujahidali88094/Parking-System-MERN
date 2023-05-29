import React from "react"
import { Button, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import { useDispatch } from "react-redux";
import { displayNotification } from "../redux/notificationSlice";
import { getAllBookingsApi } from "../common/axiosClient";

export default function Bookings() {
  const [bookings, setBookings] = React.useState([]);

  const dispatch = useDispatch();

  const fetchBookings = React.useCallback(async () => {
    try {
      const response = await getAllBookingsApi();
      response.sort((a, b) => -(new Date(b.startTime) - new Date(a.startTime)));
      setBookings(response);
    } catch (error) {
      dispatch(displayNotification({ message: error, type: "error" }));
    }
  }, [dispatch]);

  React.useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div>
      <h3>Bookings</h3>
      <div style={{ margin: 10 }}>
        <Button variant="contained" color="primary" onClick={fetchBookings}> Refresh </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: 'bold'}}>Parking Area</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>User</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Slot</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>From</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              bookings.map(booking =>
                <TableRow key={booking._id}>
                  <TableCell>{booking.parkingArea.name}</TableCell>
                  <TableCell>{booking.user.name}</TableCell>
                  <TableCell>{booking.slot}</TableCell>
                  <TableCell>{new Date(booking.startTime).toLocaleString()}</TableCell>
                  <TableCell>{new Date(booking.endTime).toLocaleString()}</TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

