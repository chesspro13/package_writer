import "./SidePanel.css";
import SidePanel from "./SidePanel";

interface MenuData {
  menuVisable: boolean;
  setCharacterLimit: React.Dispatch<React.SetStateAction<number>>;
}

function doNothing() {
  return <div />;
}

function Menu(props: MenuData) {
  return (
    <>
      {props.menuVisable ? (
        <>
          <SidePanel setCharacterLimit={props.setCharacterLimit} />
        </>
      ) : (
        doNothing
      )}
    </>
  );
}

export default Menu;
