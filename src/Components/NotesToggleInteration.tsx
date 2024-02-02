import "./NoteToggle.css";

interface notesToggleInterface {
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  getToggleMenu: boolean;
  setNoteCounter: React.Dispatch<React.SetStateAction<number>>;
  noteCount: number;
}
function NotesToggle(props: notesToggleInterface) {
  function toggleNotes() {
    props.setToggleMenu(!props.getToggleMenu);
  }

  function updateCount(
    value: number,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) {
    if (value < 0) return;
    else setter(value);
  }

  function getNoteCounter() {
    return (
      <>
        <label onClick={toggleNotes}>Number of Notes:</label>
        <input
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateCount(parseInt(e.target.value), props.setNoteCounter)
          }
          value={props.noteCount}
        />
      </>
    );
  }
  return (
    <div>
      {props.getToggleMenu ? (
        getNoteCounter()
      ) : (
        <div onClick={toggleNotes}>Enable Notes</div>
      )}
    </div>
  );
}

export default NotesToggle;
