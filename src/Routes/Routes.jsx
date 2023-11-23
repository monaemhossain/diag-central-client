import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

const Routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
  ]);

export default Routes