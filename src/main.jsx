// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Router from "./Router";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
        <RouterProvider router={Router} />
  );
};

createRoot(document.getElementById("root")).render(<App />);