import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "tours",
        element: <Tours />,
      },
      {
        path: "tourDetail/:id",
        element: <TourDetails />,
      },
    ],
  },
]);