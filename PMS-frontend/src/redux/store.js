import { configureStore } from '@reduxjs/toolkit';
import notificationSlice from './notificationSlice';

const store = configureStore({
  reducer: {
    notification : notificationSlice,
  },
});

export default store;
