import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainEditor from "./pages/MainEditor";
import About from "./pages/About/About";
import Support from "./pages/Support/Support";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<MainEditor />} />
        <Route path="about" element={<About />} />
        <Route path="support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
