import "./revision.css";

interface setterProps {
  output: string;
  revisions: string[];
  updateRevisions: React.Dispatch<React.SetStateAction<string[]>>;
}

function RevisionButtons(props: setterProps) {
  function updateOutput() {
    let revisions: string[] = [ props.output ]

    props.revisions.map( (item) => {
      if ( item != "")
        revisions.push(item)
    });

    props.updateRevisions( revisions );
    localStorage.setItem("revisions", JSON.stringify(revisions))
  }

  function resetOutput() {
    props.updateRevisions([""]);
    localStorage.removeItem("revisions");
  }

  return (
    <div className="revision-parent">
      <button onClick={updateOutput}>Save Revision</button>
      <button onClick={resetOutput}>Delete Revisions</button>
    </div>
  );
}

export default RevisionButtons;
