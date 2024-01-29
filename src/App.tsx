import "./App.css";
import { useState } from "react";
import RevisionButtons from "./RevisionControl/revision-buttons";
import EditorBody from "./Editor/editor-body";
import RevisionElement from "./RevisionControl/RevisionElement";
import NavigationBar from "./NavigationBar/nav";

interface appInterface {
  characterLimit: number;
  setCharacterLimit: React.Dispatch<React.SetStateAction<number>>;
}

function App() {
  const [revisions, setRevisions] = useState([""]);
  const [output, setOutput] = useState("");
  const [characterLimit, setCharacterLimit] = useState(350);

  return (
    <>
      <NavigationBar setCharacterLimit={setCharacterLimit} />
      <div className="body">
        <EditorBody output_setter={setOutput} characterLimit={characterLimit} />
        <RevisionButtons
          revisions={revisions}
          updateRevisions={setRevisions}
          output={output}
        />
        <RevisionElement
          revisions={revisions}
          characterLimit={characterLimit}
        />
        <footer>
          <div>Version 0.1.3</div>
        </footer>
      </div>
    </>
  );
}

export default App;
