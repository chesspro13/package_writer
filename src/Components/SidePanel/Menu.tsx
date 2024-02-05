import "./SidePanel.css";
import SidePanel from "./SidePanel";

interface MenuData {
  menuVisable: boolean;
  setCharacterLimit: React.Dispatch<React.SetStateAction<number>>;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  getToggleMenu: boolean;
  setNoteCounter: React.Dispatch<React.SetStateAction<number>>;
  noteCount: number;
}

function Menu(props: MenuData) {
  function doNothing() {
    return <div />;
  }
  return (
    <>
      {props.menuVisable ? (
        <SidePanel
          setCharacterLimit={props.setCharacterLimit}
          setToggleMenu={props.setToggleMenu}
          getToggleMenu={props.getToggleMenu}
          setNoteCounter={props.setNoteCounter}
          noteCount={props.noteCount}
        />
      ) : (
        doNothing()
      )}
    </>
  );
}

export default Menu;
