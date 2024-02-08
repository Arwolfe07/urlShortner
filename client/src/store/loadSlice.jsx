import { createSlice } from "@reduxjs/toolkit";

const loadSlice = createSlice({
  name: "load",
  initialState: false,
  reducers: {
    setLoad: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLoad } = loadSlice.actions;

export default loadSlice.reducer;
