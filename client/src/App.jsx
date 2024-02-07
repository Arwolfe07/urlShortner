import { RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/RootLayout";
import Auth from "./pages/Auth";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Auth />,
      },
    ],
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
