import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "fr",
  // Add more user-related state if needed
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = dashboardSlice.actions;
export const selectLanguage = (state: { dashboard: { language: string } }) =>
  state.dashboard.language;
export default dashboardSlice.reducer;
