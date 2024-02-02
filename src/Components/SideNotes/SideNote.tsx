import "./SideNote.css";

interface notesToggleInterface {
  menuToggle: boolean;
  noteCount: number;
}
function showNotes(noteCount: number) {
  let textBoxes = [];
  for (let i = 0; i < noteCount; i++) {
    textBoxes.push(<textarea />);
  }
  return (
    <div className="toggleBlock">
      <h2>Notes</h2>
      {textBoxes}
    </div>
  );
}

function doNothing() {
  return <></>;
}
function SideNote(props: notesToggleInterface) {
  return props.menuToggle ? showNotes(props.noteCount) : doNothing();
}

export default SideNote;
