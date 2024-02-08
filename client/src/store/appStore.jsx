import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loadReducer from "./loadSlice";
import urlsReducer from "./urlsSlice";

const appStore = configureStore({
  reducer: { user: userReducer, loading: loadReducer, urls: urlsReducer },
});

export default appStore;
