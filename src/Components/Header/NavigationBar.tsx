import Navbar from "react-bootstrap/Navbar";
import "./NavigationBar.css";
import { NavLink } from "react-router-dom";
import hamburger_menu from "../../assets/icons/menu_icon.png";

interface navInterface {
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
}

function NavigationBar(props: navInterface) {
  function toggleMenu() {
    props.toggleMenu(!props.menuOpen);
  }

  return (
    <div className="nav_filler">
      <Navbar sticky="top" id="header">
        <h1>
          <NavLink to="/" className={"navigation_button"}>
            Package Writer{" "}
          </NavLink>
        </h1>
        <NavLink to="/about" className={"sub-important navigation_button"}>
          About
        </NavLink>
        <NavLink to="/support" className={"sub-important navigation_button"}>
          Support
        </NavLink>
      </Navbar>
      {/* <div className="nav_button_group">
        {props.showCharacters ? characterSelector(props) : doNothing()}
        {/* <Menu /> * /}
      </div> */}
      <img
        src={hamburger_menu}
        alt="Menu"
        className="hamburger_menu"
        onClick={toggleMenu}
      />
    </div>
  );
}

export default NavigationBar;
