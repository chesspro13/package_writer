import "./SidePanel.css";
import CharacterLimitSelector from "../CharacterLimitSelector";
import NotesToggle from "../NotesToggleInteration";
import EditorToggle from "../EditorToggle";

interface characterSelector {
  setCharacterLimit: React.Dispatch<React.SetStateAction<number>>;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  getToggleMenu: boolean;
  setNoteCounter: React.Dispatch<React.SetStateAction<number>>;
  noteCount: number;
  setEditorType: React.Dispatch<React.SetStateAction<boolean>>;
  editorType: boolean;
}

function SidePanel(props: characterSelector) {
  return (
    <div className="side_pane">
      <CharacterLimitSelector setCharacterLimit={props.setCharacterLimit} />
      <NotesToggle
        notesMenuState={props.getToggleMenu}
        setNotesMenuState={props.setToggleMenu}
        setNoteCounter={props.setNoteCounter}
        noteCount={props.noteCount}
      />
      <EditorToggle
        editorType={props.editorType}
        setEditorType={props.setEditorType}
      />
    </div>
  );
}

export default SidePanel;
