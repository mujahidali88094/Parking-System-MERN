import { Home, Login, Signup, ParkingAreas, PickSlot, BookSlot, PaymentSuccessful } from "../pages";
import RequireLogin from "../components/RequireLogin";

const pages = [
  { name: "Home", path: "/", element: <Home />},
  { name: "Login", path: "/login", element: <Login /> },
  { name: "Signup", path: "/signup", element: <Signup /> },
  { name: "Parking Areas", path: "/parkingAreas", element: <RequireLogin><ParkingAreas /></RequireLogin> },
  { name: "Pick Slot", path: "/pickSlot", element: <RequireLogin role='user'><PickSlot /></RequireLogin> },
  { name: "Book Slot", path: "/bookSlot", element: <RequireLogin role='user'><BookSlot /></RequireLogin> },
  { name: "Payment Successful", path: "/paymentSuccessful", element: <PaymentSuccessful /> },
  { name: "Payment Failed", path: "/paymentFailed", element: <h3>Payment Failed</h3> },
];

export default pages;