import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    authorizeUser: (state, action) => {
      localStorage.setItem("Profile", JSON.stringify({ ...action?.payload }));
      return action.payload;
    },
    logoutUser: (state, action) => {
      localStorage.clear();
      return null;
    },
  },
});

export const {authorizeUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;
