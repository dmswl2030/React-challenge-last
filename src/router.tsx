import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Popular from "./routes/Popular";
import Comming from "./routes/Comming";
import NowPlaying from "./routes/NowPlaying";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Popular />,
      },
      {
        path: "coming-soon",
        element: <Comming />,
      },
      {
        path: "now-playing",
        element: <NowPlaying />,
      },
    ],
  },
]);
