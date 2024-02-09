import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./components/RootLayout";
import Auth from "./pages/Auth";
import Redirect from "./pages/Redirect";
import Main from "./pages/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/main",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
  },
  {
    path: "/short/:urlname",
    element: <Redirect />,
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
