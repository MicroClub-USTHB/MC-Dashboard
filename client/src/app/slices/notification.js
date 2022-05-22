import { createSlice } from '@reduxjs/toolkit';

const initial = null;
const notifications = createSlice({
  name: 'notifications',
  initialState: initial,
  reducers: {
    setNotification: (state, { payload: { title, description, type, timeOut } }) => ({
      title,
      description,
      type,
      timeOut,
    }),
    removeNotification: (state) => {
      state = null;
      return state;
    },
  },
});

export const { setNotification, removeNotification } = notifications.actions;

export default notifications.reducer;
