import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.isAdmin = action.payload.isAdmin || false;
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer; 