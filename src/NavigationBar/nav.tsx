import Navbar from "react-bootstrap/Navbar";
import "./NavigationBar.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
interface navInterface {
  setCharacterLimit: React.Dispatch<React.SetStateAction<number>>;
  showCharacters: boolean;
}

function characterSelector(props: navInterface) {
  return (
    <div>
      Max Characters:
      <select
        defaultValue={350}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          props.setCharacterLimit(parseInt(e.target.value))
        }
      >
        <option value={250}>250</option>
        <option value={350}>350</option>
        <option value={700}>700</option>
        <option value={-1}>No Limit</option>
      </select>
    </div>
  );
}

function doNothing() {
  return <p></p>;
}

function NavigationBar(props: navInterface) {
  return (
    <div className="nav_filler">
      <Navbar sticky="top" id="header">
        <h1>
          <NavLink to="/" className={"navigation_button"}>
            Package Writer{" "}
          </NavLink>
          <NavLink to="about" className={"sub-important navigation_button"}>
            About
          </NavLink>
        </h1>
      </Navbar>
      <div className="nav_button_group">
        {props.showCharacters ? characterSelector(props) : doNothing()}
      </div>
    </div>
  );
}

export default NavigationBar;
