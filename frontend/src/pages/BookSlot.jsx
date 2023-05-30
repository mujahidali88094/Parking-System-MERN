import React from "react";
import { Button, Paper, TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { displayNotification } from "../redux/notificationSlice";
import { bookSlotApi } from "../common/axiosClient";
import { generateGoogleMapsLink } from "../common/helpers";

export default function BookSlot() {
  const { parkingArea, startTime, endTime, slot } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const [paymentUrl, setPaymentUrl] = React.useState("");

  const onBookSlotClick = async () => {
    try {
      const response = await bookSlotApi({ parkingAreaId: parkingArea._id, startTime, endTime, slot });
      setPaymentUrl(response.paymentSession.url);
    } catch (error) {
      dispatch(displayNotification({ message: error, type: "error" }));
    }
  }

  return (
    <div>
      <h3>Book Parking Slot</h3>
      {
        !parkingArea || !startTime || !endTime || !slot
          ? <h3>Please select a parking area, time and slot first</h3>
          : <div>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                <TableRow>
                  <TableCell>Parking Area</TableCell>
                  <TableCell>{parkingArea.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell><a href={generateGoogleMapsLink(parkingArea.lat, parkingArea.lng)} target="_blank" rel="noopener noreferrer">Location</a></TableCell>
                  </TableRow>
                <TableRow>
                  <TableCell>From</TableCell>
                  <TableCell>{startTime.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>To</TableCell>
                  <TableCell>{endTime.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Slot</TableCell>
                  <TableCell>{slot}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" color="primary" style={{ margin: 10 }}
              onClick={onBookSlotClick}
            >Book Slot</Button>
            {
              paymentUrl && <Button variant="contained" color="primary" style={{ margin: 10 }}
                onClick={() => window.open(paymentUrl, "_blank")}
              >Pay Now To Complete Booking</Button>
            }
            </div>
      }
    </div>
  );
}