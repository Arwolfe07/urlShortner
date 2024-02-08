import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import appStore from "./store/appStore.jsx";
import { SnackbarProvider } from "notistack";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <SnackbarProvider autoHideDuration={2500}>
      <App />
    </SnackbarProvider>
  </Provider>
);
