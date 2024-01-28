import Navbar from "react-bootstrap/Navbar";
import DarkModeButton from "./DarkMode";
import "./NavigationBar.css";

function NavigationBar() {
  return (
    <div className="nav_filler">
      <ul className="nav_bar">
        <li>
          <Navbar sticky="top" id="header">
            <h1>Package Writer</h1>
          </Navbar>
        </li>
        {/* <li><DarkModeButton /></li> */}
      </ul>
    </div>
  );
}

export default NavigationBar;
