import "./editor.css"

function Output() {
  return (
    <textarea className="output" placeholder="Package output..." readOnly wrap="hard"></textarea>
  );
}

export default Output;