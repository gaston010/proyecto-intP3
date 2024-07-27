// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Router from "./Router";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={Router} />
);
