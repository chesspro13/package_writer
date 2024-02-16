import { useEditorContext } from "../Context";
import "./revision.css";

interface setterProps {
  // output: string | undefined;
  revisions: string[] | undefined;
  updateRevisions: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

function RevisionButtons(props: setterProps) {
  const editorContext = useEditorContext();

  function updateOutput() {
    if (editorContext.output == undefined) return;
    if (props.revisions == undefined) return;

    props.updateRevisions([
      editorContext.output,
      ...props.revisions, // Put old items at the end
    ]);
  }

  function resetOutput() {
    props.updateRevisions([""]);
  }

  return (
    <div className="revision-parent">
      <button onClick={updateOutput}>Save Revision</button>
      <button onClick={resetOutput}>Delete Revisions</button>
    </div>
  );
}

export default RevisionButtons;
