import "./ToolBar.css";

interface ToolBarModeInterface {
  setToolbarMode: React.Dispatch<React.SetStateAction<string>>;
  toolbarMode: string;
  setActiveTool: React.Dispatch<React.SetStateAction<string>>;
  activeTool: string;
}

function ToolBar(props: ToolBarModeInterface) {
  const {
    setToolbarMode,
    toolbarMode,
    setActiveTool,
    activeTool,
  }: ToolBarModeInterface = props;

  function activateTool(tool: string) {
    switch (tool) {
    }
  }

  function getActionList() {
    // Need to get working
    // const wordLookupMenu = ["Synonyms", "Similar", "Definition", "Example"];
    const highlightingMenu = ["Word", "Sentance"];
    const duplicateMenu = ["On", "Off"];
    const ai = ["N/A"];

    switch (toolbarMode) {
      //   case "Word Lookup":
      //     return wordLookupMenu;
      case "Highlighting":
        return highlightingMenu;
      case "Duplicate Finder":
        return duplicateMenu;
      case "AI":
        return ai;
    }
    return ["Error: Switch failed"];
  }

  return (
    <div className="toolbar">
      <div className="dropdown">
        <button className="dropbtn">{toolbarMode}</button>
        <div className="dropdown-content">
          {/* <p onClick={(event) => setToolbarMode("Word Lookup")}>Word Lookup</p> */}
          <p onClick={(event) => setToolbarMode("Highlighting")}>
            Highlighting
          </p>
          <p onClick={(event) => setToolbarMode("Duplicate Finder")}>
            Duplicate Finder
          </p>
          <p onClick={(event) => setToolbarMode("AI")}>Ai</p>
        </div>
      </div>

      <div className="actions">
        <ul className="actionList">
          {getActionList().map((option) => (
            <>
              {option == activeTool ? (
                <li className="selected" onClick={() => activateTool(option)}>
                  {option}
                </li>
              ) : (
                <li
                  className="notSelected"
                  onClick={() => setActiveTool(option)}
                >
                  {option}
                </li>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToolBar;
