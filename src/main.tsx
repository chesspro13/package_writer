import React from "react";
import ReactDOM from "react-dom/client";
import NavigationBar from "./NavigationBar/nav";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NavigationBar />
    <App />
  </React.StrictMode>
);
