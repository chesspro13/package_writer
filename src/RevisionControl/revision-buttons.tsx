import "./revision.css";

interface setterProps {
  output: string;
  revisions: string[];
  updateRevisions: React.Dispatch<React.SetStateAction<string[]>>;
}

function RevisionButtons(props: setterProps) {
  function updateOutput() {
    if (props.output == "") return;

    props.updateRevisions([
      props.output,
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
