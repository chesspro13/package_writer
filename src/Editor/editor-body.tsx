import "./editor.css"
import Editor from "./editor";
import Output from "./output";
import CharData from "./char-data";

function EditorBody() {
    return (
        <div className="editor">
            <Editor />
            <Output />
            <CharData />
        </div>
    );
}

export default EditorBody;