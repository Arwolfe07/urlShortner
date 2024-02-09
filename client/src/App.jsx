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
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    errorElement: <Error />,
  },
  {
    path: "/main",
    element: <RootLayout />,
    errorElement: <Error />,
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
    errorElement: <Error />,
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
