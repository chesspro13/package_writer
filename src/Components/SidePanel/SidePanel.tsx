import "./SidePanel.css";
import CharacterLimitSelector from "../CharacterLimitSelector";

interface characterSelector {
  setCharacterLimit: React.Dispatch<React.SetStateAction<number>>;
}

function SidePanel(props: characterSelector) {
  return (
    <div className="side_pane">
      <CharacterLimitSelector setCharacterLimit={props.setCharacterLimit} />
    </div>
  );
}

export default SidePanel;
