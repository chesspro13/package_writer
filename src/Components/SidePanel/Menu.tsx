import "./SidePanel.css";
import SidePanel from "./SidePanel";
import { useMenuContext } from "../../Context";

interface MenuData {
  // menuVisable: boolean;
  // // setCharacterLimit: React.Dispatch<React.SetStateAction<number>>;
  // setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  // getToggleMenu: boolean;
  // setNoteCounter: React.Dispatch<React.SetStateAction<number>>;
  // noteCount: number;
}

function Menu(props: MenuData) {
  const menuContext = useMenuContext();

  function doNothing() {
    return <div />;
  }
  return <>{menuContext.menuVisible ? <SidePanel /> : doNothing()}</>;
}

export default Menu;
