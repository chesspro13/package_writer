import "./NoteToggle.css";
import ToggleSwitch from "./ToggleSwitch";

interface notesToggleInterface {
  setNotesMenuState: React.Dispatch<React.SetStateAction<boolean>>;
  notesMenuState: boolean;
  setNoteCounter: React.Dispatch<React.SetStateAction<number>>;
  noteCount: number;
}
function NotesToggle(props: notesToggleInterface) {
  function toggleNotes() {
    props.setNotesMenuState(!props.notesMenuState);
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
        <label onClick={toggleNotes}>Note Count:</label>
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
      <ToggleSwitch
        label="Notes"
        setState={props.setNotesMenuState}
        state={props.notesMenuState}
      />
      {props.notesMenuState ? getNoteCounter() : <></>}
    </div>
  );
}

export default NotesToggle;
