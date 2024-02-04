import "./EditorToggle.css";
import ToggleSwitch from "./ToggleSwitch";

interface EditorToggleInterface {
  setEditorType: React.Dispatch<React.SetStateAction<boolean>>;
  editorType: boolean;
}
function EditorToggle(props: EditorToggleInterface) {
  return (
    <div className="editorToggle">
      <label>Single</label>
      <ToggleSwitch
        label=""
        setState={props.setEditorType}
        state={props.editorType}
      />
      <label>Full EPB</label>
    </div>
  );
}

export default EditorToggle;
