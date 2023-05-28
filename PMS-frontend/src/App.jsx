import './App.css'
import { Snackbar, IconButton, Alert } from '@mui/material'
import { hideNotification } from './redux/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login, Signup, ParkingAreas, PickSlot, BookSlot } from "./pages";

const router = createBrowserRouter([
  { name: "Login", path: "/login", element: <Login /> },
  { name: "Signup", path: "/signup", element: <Signup /> },
  { name: "ParkingAreas", path: "/parkingAreas", element: <ParkingAreas /> },
  { name: "PickSlot", path: "/pickSlot", element: <PickSlot /> },
  { name: "BookSlot", path: "/bookSlot", element: <BookSlot /> },
]);

function App() {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  return (
    <>
      <Snackbar
        open={notification.open}
        autoHideDuration={notification.autoHideDuration}
        onClose={() => { dispatch(hideNotification()) }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          variant='filled'
          severity={notification.type}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => { dispatch(hideNotification()) }}>
              x
            </IconButton>
          }
        >{notification.message}</Alert>
      </Snackbar>


      <h1>Parking Management System</h1>  
      <RouterProvider router={router} />
    </>
  )
}

export default App
