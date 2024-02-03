import "./ToggleSwitch.css";

interface toggleInterface {
  label: string;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

function ToggleSwitch(props: toggleInterface) {
  function toggleState() {
    props.setState(!props.state);
  }

  return (
    <div className="container">
      {props.label}{" "}
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name={props.label}
          id={props.label}
          onChange={toggleState}
          checked={props.state}
        />
        <label className="label" htmlFor={props.label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
}

export default ToggleSwitch;
