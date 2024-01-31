import "../App.css";
import { useState } from "react";
import RevisionButtons from "../RevisionControl/revision-buttons";
import EditorBody from "../Editor/editor-body";
import RevisionElement from "../RevisionControl/RevisionElement";
import NavigationBar from "../NavigationBar/nav";
import Footer from "../Components/footer";

function MainEditor() {
  const [revisions, setRevisions] = useState([""]);
  const [output, setOutput] = useState("");
  const [characterLimit, setCharacterLimit] = useState(350);

  return (
    <>
      <NavigationBar
        setCharacterLimit={setCharacterLimit}
        showCharacters={true}
      />
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
        <Footer />
      </div>
    </>
  );
}

export default MainEditor;
