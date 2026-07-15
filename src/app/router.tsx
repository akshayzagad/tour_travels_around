import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import InfoPage from "../pages/InfoPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
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
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "tours",
        element: <Tours />,
      },
      {
        path: "destinations",
        element: (
          <InfoPage
            title="Destinations"
            description="Discover the destinations and experiences waiting for you."
          />
        ),
      },
      {
        path: "about",
        element: (
          <InfoPage
            title="About TourGo"
            description="We make it easier to discover, plan, and enjoy memorable journeys."
          />
        ),
      },
      {
        path: "contact",
        element: (
          <InfoPage
            title="Contact Us"
            description="Get in touch with the TourGo team for help planning your next trip."
          />
        ),
      },
      {
        path: "tourDetail/:id",
        element: <TourDetails />,
      },
    ],
  },
]);
