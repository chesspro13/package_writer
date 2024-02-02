import { useState } from "react";
import RevisionButtons from "../RevisionControl/revision-buttons";
import EditorBody from "../Editor/editor-body";
import RevisionElement from "../RevisionControl/RevisionElement";
import NavigationBar from "../Components/Header/NavigationBar";
import Footer from "../Components/Footer/footer";
import Menu from "../../src/Components/SidePanel/Menu";
import "../../src/Components/SidePanel/Menu.css";

function MainEditor() {
  const [revisions, setRevisions] = useState([""]);
  const [output, setOutput] = useState("");
  const [characterLimit, setCharacterLimit] = useState(350);
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <>
      <NavigationBar toggleMenu={setMenuToggle} menuOpen={menuToggle} />
      <div className="page">
        <div className="body">
          <EditorBody
            output_setter={setOutput}
            characterLimit={characterLimit}
          />
          <RevisionButtons
            revisions={revisions}
            updateRevisions={setRevisions}
            output={output}
          />
          <RevisionElement
            revisions={revisions}
            characterLimit={characterLimit}
          />
        </div>
        <Menu menuVisable={menuToggle} setCharacterLimit={setCharacterLimit} />
      </div>
      <Footer />
    </>
  );
}

export default MainEditor;
