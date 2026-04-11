import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  // Add more user-related state if needed
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearAuth: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, clearAuth } = authSlice.actions;
export const selectUser = (state: { auth: { userInfo: unknown } }) =>
  state.auth.userInfo;
export default authSlice.reducer;
