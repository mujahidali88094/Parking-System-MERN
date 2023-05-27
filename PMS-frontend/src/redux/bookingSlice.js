import { createSlice } from '@reduxjs/toolkit';

const initialState = { };

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingState: (state, action) => {
      state = action.payload;
    },
    unsetBookingState: (state) => {
      state.user = {};
    }
  },
});

export const { setBookingState, unsetBookingState } = bookingSlice.actions;

export default bookingSlice.reducer;
