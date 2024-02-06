import "./editor.css";
import { useState } from "react";

interface setterProps {
  output_setter: React.Dispatch<React.SetStateAction<string>>;
  characterLimit: number;
}

function doNothing() {
  return <div></div>;
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
  let charactersUsed = 0;

  function formatOutput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPackageText(event.target.value);
  }

  // Depricated
  function createMarkupText(text: string) {
    let revision_text_a = "";
    let revision_text_b = "";

    charactersUsed = getTrueSize(text);

    for (var i = 0; i < text.length; i++)
      if (i < props.characterLimit)
        revision_text_a = revision_text_a.concat(text[i]);
      else revision_text_b = revision_text_b.concat(text[i]);

    props.output_setter(text);

    return (
      <>
        {props.characterLimit == -1 ? (
          <span className="black">{text}</span>
        ) : (
          <>
            <span className="black">{revision_text_a}</span>
            <span className="red">{revision_text_b}</span>{" "}
          </>
        )}
      </>
    );
  }

  function createSpanMarkupText(text: string) {
    charactersUsed = getTrueSize(text);

    let input = text.split(" ");
    let output: React.JSX.Element[] = new Array();
    let charSoFar = 0;

    console.log(input);

    for (let j = 0; j < input.length; j++) {
      let i = input[j];

      if (charSoFar + i.length <= props.characterLimit) {
        console.log("This");
        output.push(
          <span
            className="word"
            // onClick={(event) => {
            //   (event.target as Element).classList.add("red");
            //   console.log("Clicked");
            // }}
          >
            <span> {i} </span>
          </span>
        );
      } else if (charSoFar > props.characterLimit) {
        console.log("That");
        output.push(
          <span className="word">
            <span className="red">{i} </span>
          </span>
        );
      } else {
        console.log("The Other");
        let blackString = "";
        let redString = "";
        for (let j = 1; j < i.length + 1; j++) {
          if (charSoFar + j < props.characterLimit) blackString += i[j - 1];
          else redString += i[j - 1];
        }

        output.push(
          <span className="word">
            <span className="black">{blackString}</span>
            <span className="red">{redString}</span>
          </span>
        );
      }
      charSoFar += i.length + 1;
    }

    return output;
  }

  return (
    <div className="editor">
      <textarea
        className="input editorBox"
        placeholder="Package data here..."
        wrap="hard"
        onChange={formatOutput}
      />

      <div className="output editorBox">
        {packageText.length > 0 ? (
          <>{createSpanMarkupText(packageText).map((a) => a)}</>
        ) : (
          "Output..."
        )}
      </div>
      {props.characterLimit == -1 ? (
        doNothing()
      ) : (
        <ul className="char-data">
          <li>Used: {charactersUsed}</li>
          <li>Avaliable: {props.characterLimit - charactersUsed}</li>
        </ul>
      )}
    </div>
  );
}

export default EditorBody;
