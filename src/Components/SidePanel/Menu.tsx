import "./SidePanel.css";
import SidePanel from "./SidePanel";

interface MenuData {
  menuVisable: boolean;
  setCharacterLimit: React.Dispatch<React.SetStateAction<number>>;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  getToggleMenu: boolean;
  setNoteCounter: React.Dispatch<React.SetStateAction<number>>;
  noteCount: number;
  setEditorType: React.Dispatch<React.SetStateAction<boolean>>;
  editorType: boolean;
}

function doNothing() {
  return <div />;
}

function Menu(props: MenuData) {
  return (
    <>
      {props.menuVisable ? (
        <>
          <SidePanel
            setCharacterLimit={props.setCharacterLimit}
            setToggleMenu={props.setToggleMenu}
            getToggleMenu={props.getToggleMenu}
            setNoteCounter={props.setNoteCounter}
            noteCount={props.noteCount}
            editorType={props.editorType}
            setEditorType={props.setEditorType}
          />
        </>
      ) : (
        doNothing
      )}
    </>
  );
}

export default Menu;
