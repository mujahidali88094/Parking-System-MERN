import { configureStore } from '@reduxjs/toolkit';
import notificationSlice from './notificationSlice';
import loginSlice from './loginSlice';

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    login: loginSlice,
  },
});

export default store;
