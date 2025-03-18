import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  isLoggedIn: false,
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      state.isAdmin = action.payload.role === 'ADMIN';
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer; 