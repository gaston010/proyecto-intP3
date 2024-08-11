// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Router from "./Router";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import "./Style.css";
const App = () => {
  return (
        <RouterProvider router={Router} />
  );
};

createRoot(document.getElementById("root")).render(
<ThemeProvider>
  <App />
</ThemeProvider>
);