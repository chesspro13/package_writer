import "./editor.css";
import { useState } from "react";

interface setterProps {
  output_setter: React.Dispatch<React.SetStateAction<string>>;
}

function getTrueSize(str: string) {
  let s = str.split(/\s/);
  let output = "";
  s.forEach((element) => {
    if (element != "") output += element + " ";
  });
  return output.trim().length;
}

function EditorBody(props: setterProps) {
  const [packageText, setPackageText] = useState("");
  const maxCharacters = 350;
  let charactersUsed = 0;

  function formatOutput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPackageText(event.target.value);
  }

  function createMarkupText(text: string) {
    let revision_text_a = "";
    let revision_text_b = "";

    charactersUsed = getTrueSize(text);

    for (var i = 0; i < text.length; i++)
      if (i < maxCharacters) revision_text_a = revision_text_a.concat(text[i]);
      else revision_text_b = revision_text_b.concat(text[i]);

    props.output_setter(text);

    return (
      <>
        <span className="black">{revision_text_a}</span>
        <span className="red">{revision_text_b}</span>
      </>
    );
  }

  return (
    <div className="editor">
      <textarea
        className="input editorBox"
        placeholder="Package data here..."
        wrap="hard"
        onChange={formatOutput}
      />

      <div className="output editorBox">{createMarkupText(packageText)}</div>

      <ul className="char-data">
        <li>Used: {charactersUsed}</li>
        <li>Avaliable: {maxCharacters - charactersUsed}</li>
      </ul>
    </div>
  );
}

export default EditorBody;
