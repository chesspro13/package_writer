import { useMenuContext } from "../Context";
import "./NoteToggle.css";
import ToggleSwitch from "./ToggleSwitch";

interface notesToggleInterface {
  // setNotesMenuState: React.Dispatch<React.SetStateAction<boolean>>;
  // notesMenuState: boolean;
  // setNoteCounter: React.Dispatch<React.SetStateAction<number>>;
  // noteCount: number;
}
function NotesToggle(props: notesToggleInterface) {
  const menuContext = useMenuContext();

  function toggleNotes() {
    menuContext.setNotesEnabled(!menuContext.notesEnabled);
  }

  function updateCount(value: number) {
    if (value < 0) return;
    else menuContext.setNoteCount(value);
  }

  function getNoteCounter() {
    return (
      <>
        <label onClick={toggleNotes}>Note Count:</label>
        <input
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateCount(parseInt(e.target.value))
          }
          value={menuContext.noteCount}
        />
      </>
    );
  }
  function setNoteState(state: boolean) {
    menuContext.setNotesEnabled(state);
  }
  return (
    <div>
      <ToggleSwitch
        label="Notes"
        // setState={menuContext.notesEnabled}
        state={menuContext.notesEnabled}
      />
      {menuContext.menuVisible ? getNoteCounter() : <></>}
    </div>
  );
}

export default NotesToggle;
