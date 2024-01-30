import "./App.css";
import { useState } from "react";
import RevisionButtons from "./RevisionControl/revision-buttons";
import EditorBody from "./Editor/editor-body";
import RevisionElement from "./RevisionControl/RevisionElement";
import NavigationBar from "./NavigationBar/nav";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainEditor from "./pages/MainEditor";
import About from "./pages/About";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainEditor />} />
          <Route path="/home" element={<MainEditor />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
