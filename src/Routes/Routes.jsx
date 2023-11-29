import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUpPage from "../Pages/SignUpPage/SignUpPage";
import AccessedRoute from "../Components/PrivateRoute/AccessedRoute";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import UserDashboard from "../Pages/Dashboard/UserDashboard";
import AllTests from "../Pages/AllTests/AllTests";
import TestDetails from "../Pages/TestDetails/TestDetails";

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <AccessedRoute> <LoginPage /> </AccessedRoute>
      },
      {
        path: '/sign-up',
        element: <AccessedRoute><SignUpPage /></AccessedRoute>
      },
      {
        path: '/admin-dashboard',
        element: <PrivateRoute><AdminDashboard /></PrivateRoute>
      },
      {
        path: '/user-dashboard',
        element: <PrivateRoute><UserDashboard /></PrivateRoute>
      },
      {
        path: '/all-tests',
        element: <AllTests />
      },
      {
        path: '/test-details/:id',
        element: <PrivateRoute><TestDetails /></PrivateRoute>,
        loader: ({ params }) => {
          return fetch(`http://localhost:4000/test/${params.id}`);
        }
      }
    ]
  },
]);

export default Routes