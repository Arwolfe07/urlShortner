import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/RootLayout";
import Auth from "./pages/Auth";
import Main from "./pages/Main";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: "/main",
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <Main />,
      }
    ]
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
