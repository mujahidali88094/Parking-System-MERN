import { Button, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { displayNotification } from "../redux/notificationSlice";
import { bookSlotApi } from "../common/axiosClient";
import { unsetBookingState } from "../redux/bookingSlice";
import { generateGoogleMapsLink } from "../common/helpers";

export default function BookSlot() {
  const { parkingArea, startTime, endTime, slot } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  const onBookSlotClick = async () => {
    try {
      const response = await bookSlotApi({ parkingAreaId: parkingArea._id, startTime, endTime, slot });
      window.open(response.paymentSession.url, "_blank");
      dispatch(unsetBookingState());
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
            <Button variant="contained" color="primary" style={{ margin: 10 }}
              onClick={onBookSlotClick}
            >Book Slot</Button>
            </div>
      }
    </div>
  );
}