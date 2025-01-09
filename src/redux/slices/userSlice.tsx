import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Set user data
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null; // Clear user data on logout
    },
  },
});

export const { setUser, setError, clearUser } = userSlice.actions;

export default userSlice.reducer;
