import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "../Pages/ErrorPage.jsx/ErrorPage";
import Home from "../Pages/Home/Home";

const Routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home />
        }
      ]
    },
  ]);

export default Routes