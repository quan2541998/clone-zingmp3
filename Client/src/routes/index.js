// import App from "./App";
import { elements } from "chart.js";
import { DefaultLayout, UpdateLayout } from "../component/Layout";
import {
  Home,
  Chart,
  Radio,
  Follow,
  Update,
  Album,
  WeekChart,
  Search,
} from "../pages/public";
import ProtectedRoute from "../component/Auth/ProtectedRoute";
import {
  AllSearch,
  SongsSearch,
  ArtistSearch,
  PlayListSearch,
  MVSearch,
} from "../pages/public/Search/ExportComponent.js";
//
import NotFound from "../component/404NotFound";

import { createBrowserRouter } from "react-router-dom";
import AuthSection from "../component/AuthSection";
import MyMusic from "../pages/private/MyMusic";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "zing-chart",
        element: <Chart />,
      },
      {
        path: "radio",
        element: <Radio />,
      },
      {
        path: "album/:title/:pid",
        element: <Album />,
      },
      {
        path: "playlist/:title/:pid",
        element: <Album />,
      },
      {
        path: "zing-chart-tuan/:title/:pid",
        element: <WeekChart />,
      },
      {
        path: "tim-kiem",
        element: <Search />,
        children: [
          {
            path: "tat-ca",
            element: <AllSearch />,
          },
          {
            path: "bai-hat",
            element: <SongsSearch />,
          },
          {
            path: "playlist",
            element: <PlayListSearch />,
          },
          {
            path: "artist",
            element: <ArtistSearch />,
          },
          {
            path: "video",
            element: <MVSearch />,
          },
        ],
      },
      {
        path: "my-music",
        element: (
          <ProtectedRoute>
            <MyMusic />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <AuthSection />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
