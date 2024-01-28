// import './App.css'
import { useState } from "react";
import RevisionButtons from "./RevisionControl/revision-buttons";
import EditorBody from "./Editor/editor-body";
import RevisionElement from "./RevisionControl/RevisionElement";

function App() {
  const [revisions, setRevisions] = useState([""]);
  const [output, setOutput] = useState("");

  return (
    <div className="body">
      <EditorBody output_setter={setOutput} />
      <RevisionButtons
        revisions={revisions}
        updateRevisions={setRevisions}
        output={output}
      />
      <RevisionElement revisions={revisions} />
    </div>
  );
}

export default App;
