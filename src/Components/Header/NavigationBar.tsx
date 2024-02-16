import Navbar from "react-bootstrap/Navbar";
import "./NavigationBar.css";
import { NavLink } from "react-router-dom";
import hamburger_menu from "../../assets/icons/menu_icon.png";
import { useMenuContext, MenuInterface } from "../../Context";

interface navInterface {
  allowSidebar: boolean;
}

function NavigationBar(props: navInterface) {
  // const menuContext = useMenuContext();
  const menuContext = useMenuContext();

  function toggleMenu() {
    console.log(menuContext.menuVisible);
    // menuContext.menuVisible = !menuContext.menuVisible;
    menuContext.setMenuVisible(!menuContext.menuVisible);

    console.log("Toggling stuff!");
    console.log(menuContext.menuVisible);
  }

  return (
    <div className="nav_filler">
      <Navbar sticky="top" id="header">
        <h1>
          <NavLink to="/" className={"navigation_button"}>
            Package Writer{" "}
          </NavLink>
        </h1>
        {/* <NavLink to="/about" className={"sub-important navigation_button"}>
          About
        </NavLink>
        <NavLink to="/support" className={"sub-important navigation_button"}>
          Support
        </NavLink> */}
      </Navbar>
      {/* <div className="nav_button_group">
        {props.showCharacters ? characterSelector(props) : doNothing()}
        {/* <Menu /> * /}
      </div> */}
      {props.allowSidebar ? (
        <img
          src={hamburger_menu}
          alt="Menu"
          className="hamburger_menu"
          onClick={toggleMenu}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default NavigationBar;
