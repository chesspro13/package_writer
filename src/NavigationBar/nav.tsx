import Navbar from "react-bootstrap/Navbar";
import "./NavigationBar.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

interface navInterface {
  setCharacterLimit: React.Dispatch<React.SetStateAction<number>>;
}

function NavigationBar(props: navInterface) {
  return (
    <div className="nav_filler">
      <Navbar sticky="top" id="header">
        <h1>Package Writer</h1>
      </Navbar>
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
    </div>
  );
}

export default NavigationBar;
