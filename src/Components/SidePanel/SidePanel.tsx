import "./SidePanel.css";
import CharacterLimitSelector from "../CharacterLimitSelector";
import NotesToggle from "../NotesToggleInteration";

interface characterSelector {
  setCharacterLimit: React.Dispatch<React.SetStateAction<number>>;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  getToggleMenu: boolean;
  setNoteCounter: React.Dispatch<React.SetStateAction<number>>;
  noteCount: number;
}

function SidePanel(props: characterSelector) {
  return (
    <div className="side_pane">
      <CharacterLimitSelector setCharacterLimit={props.setCharacterLimit} />
      <NotesToggle
        getToggleMenu={props.getToggleMenu}
        setToggleMenu={props.setToggleMenu}
        setNoteCounter={props.setNoteCounter}
        noteCount={props.noteCount}
      />
    </div>
  );
}

export default SidePanel;
