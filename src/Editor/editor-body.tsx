import "./editor.css";
import { useState } from "react";

interface setterProps {
  output_setter: React.Dispatch<React.SetStateAction<string>>;
  characterLimit: number;
  wordBankStateSetter: React.Dispatch<React.SetStateAction<boolean>>;
  wordBankState: boolean;
  setApiCallWord: React.Dispatch<React.SetStateAction<string>>;
  apiCallWord: string;
  setWordBank: React.Dispatch<React.SetStateAction<string>>;
  activeTool: string;
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

  function disableWordBank() {
    props.wordBankStateSetter(false);
  }

  function enableWordBank() {
    props.wordBankStateSetter(true);
  }

  async function getWord(word: string) {
    if (word == "" || props.activeTool != "Word Lookup")
      return '{"message":"Error"}';
    // Make a way to return if the word was the previous word found
    // if (word == props.apiCallWord ) return
    const safeWord = word.replace(/[^\w\s]/gi, "").trim();
    const url =
      "https://wordsapiv1.p.rapidapi.com/words/" + safeWord + "/synonyms";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0c636705c6msh2d92ea17f774b4ap1147b2jsn94f4ac2f7d58",
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      return result;
    } catch (error) {
      console.error(error);
      return '{"messages":"Unable to fetch words. Please try again later."}';
    }
    return '{"messages":"Error"}';
  }

  const [apiCallWord, setApiCallWord] = useState(String);
  function createSpanMarkupText(text: string) {
    let index = 0;
    charactersUsed = getTrueSize(text);

    let input = text.split(" ");
    let output: React.JSX.Element[] = new Array();
    let charSoFar = 0;

    function updateClickedWord(word: string) {
      if (word != apiCallWord) {
        enableWordBank();
        setApiCallWord(word);
        props.setApiCallWord(word);
        getWord(word).then((a) => props.setWordBank(a));
      } else {
        disableWordBank();
        setApiCallWord("");
        props.setApiCallWord("");
      }
    }

    for (let j = 0; j < input.length; j++) {
      let i = input[j];
      if (i == "") continue;

      if (charSoFar + i.length <= props.characterLimit) {
        output.push(
          <span
            key={index}
            className={i == apiCallWord ? "word clicked" : "word"}
            onClick={() => {
              updateClickedWord(i);
            }}
          >
            <span> {i} </span>
          </span>
        );
      } else if (charSoFar > props.characterLimit) {
        output.push(
          <span
            key={index}
            className={i == apiCallWord ? "word clicked" : "word"}
            onClick={() => {
              updateClickedWord(i);
            }}
          >
            <span className="red">{i} </span>
          </span>
        );
      } else {
        let blackString = "";
        let redString = "";
        for (let j = 1; j < i.length + 1; j++) {
          if (charSoFar + j < props.characterLimit) blackString += i[j - 1];
          else redString += i[j - 1];
        }

        output.push(
          <span
            key={index}
            className={i == apiCallWord ? "word clicked" : "word"}
            onClick={() => {
              updateClickedWord(i);
            }}
          >
            <span className="black">{blackString}</span>
            <span className="red">{redString}</span>
          </span>
        );
      }
      charSoFar += i.length + 1;
      index++;
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
          <li key="used">Used: {charactersUsed}</li>
          <li key="avaliable">
            Avaliable: {props.characterLimit - charactersUsed}
          </li>
        </ul>
      )}
    </div>
  );
}

export default EditorBody;
