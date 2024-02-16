import "./SidePanel.css";
import CharacterLimitSelector from "../CharacterLimitSelector";

function SidePanel() {
  return (
    <div className="side_pane">
      <CharacterLimitSelector />
      {/* <NotesToggle /> */}
    </div>
  );
}

export default SidePanel;
