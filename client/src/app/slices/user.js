import { createSlice } from '@reduxjs/toolkit';

const initial = JSON.parse(localStorage.getItem('User') || 'null');

const user = createSlice({
  name: 'user',
  initialState: initial,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem('User', JSON.stringify(action.payload));
      state = action.payload ?? null;
      return state;
    },
    removeUser: (state) => {
      localStorage.removeItem('User');
      state = null;
      return state;
    },
  },
});

export const { setUser, removeUser } = user.actions;

export default user.reducer;
