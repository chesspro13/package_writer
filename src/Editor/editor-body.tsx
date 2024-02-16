import "./editor.css";
import { useState } from "react";
import { useEditorContext, useWordbankContext } from "../Context";

interface setterProps {
  activeTool: string;
  toolbarMode: string;
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
  const [promiseResolved, setPromiseResolved] = useState(false);
  let charactersUsed = 0;

  const editorContext = useEditorContext();
  // const wordBankContext = useWordbankContext();

  function formatOutput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPackageText(event.target.value);
  }

  // function disableWordBank() {
  //   props.wordBankStateSetter(false);
  // }

  // function enableWordBank() {
  //   props.wordBankStateSetter(true);
  // }

  // function getListOfWords(responseArray: string[]) {
  //   if (props.wordApiResponse == undefined)
  //     return { message: "promise not returned yet" };
  //   props.wordApiResponse["results"].map((element: any) => {
  //     "synonyms" in element
  //       ? element["synonyms"].map((words: string) =>
  //           !responseArray.includes(words) ? responseArray.push(words) : words
  //         )
  //       : element;
  //   });
  // }

  // function setWordBank(json: any) {
  //   const wordBank: string[] = [];

  //   json["results"].map((element: any) => {
  //     "synonyms" in element
  //       ? element["synonyms"].map((words: string) =>
  //           !wordBank.includes(words) ? wordBank.push(words) : words
  //         )
  //       : element;
  //     "similarTo" in element
  //       ? element["similarTo"].map((words: string) =>
  //           !wordBank.includes(words) ? wordBank.push(words) : words
  //         )
  //       : element;
  //   });

  //   // props.setWordBank(wordBank);
  // }

  // async function getWord(word: string) {
  //   if (word == "") return '{"message":"Error: Word empty!"}';
  //   if (props.toolbarMode != "Word Lookup")
  //     return '{"message":"Error: Word Lookup Tool not selected!"}';

  //   const responseArray: string[] = [];
  //   if (promiseResolved && word == props.wordApiResponse["word"])
  //     return getListOfWords(responseArray);
  //   // Make a way to return if the word was the previous word found
  //   // if (word == props.apiCallWord ) return
  //   const safeWord = word.replace(/[^\w\s]/gi, "").trim();
  //   const url = "https://wordsapiv1.p.rapidapi.com/words/" + safeWord;
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "7d9cb91432mshfe2fa74efc910f4p1ecd48jsn6c46666d0ddd",
  //       "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  //     },
  //   };

  //   try {
  //     setPromiseResolved(false);
  //     const response = await fetch(url, options);
  //     const result = await response.text();
  //     const resultJson = await JSON.parse(result);
  //     console.log(resultJson);
  //     props.setApiCallWord(resultJson["word"]);
  //     props.setWordApiResponse(resultJson);
  //     setWordBank(resultJson);
  //     setPromiseResolved(true);
  //     return getListOfWords(responseArray);
  //   } catch (error) {
  //     console.error(error);
  //     return '{"messages":"Unable to fetch words. Please try again later."}';
  //   }
  //   return '{"messages":"Error"}';
  // }

  const [apiCallWord, setApiCallWord] = useState(String);
  function createSpanMarkupText(text: string) {
    let index = 0;
    charactersUsed = getTrueSize(text);

    let input = text.split(" ");
    let output: React.JSX.Element[] = new Array();
    let charSoFar = 0;

    // function updateClickedWord(word: string) {
    //   if (word != apiCallWord) {
    //     enableWordBank();
    //     setApiCallWord(word);
    //     props.setApiCallWord(word);
    //     getWord(word);
    //   } else {
    //     disableWordBank();
    //     setApiCallWord("");
    //     props.setApiCallWord("");
    //   }
    // }

    if (editorContext.characterLimit == undefined) {
      for (let j = 0; j < input.length; j++) {
        let i = input[j];
        if (i == "") continue;
        output.push(<span>{i + " "}</span>);
      }
      return output;
    }

    for (let j = 0; j < input.length; j++) {
      let i = input[j];
      if (i == "") continue;

      if (charSoFar + i.length <= editorContext.characterLimit) {
        output.push(
          <span
            key={index}
            className={i == apiCallWord ? "word clicked" : "word"}
            onClick={() => {
              // updateClickedWord(i);
            }}
          >
            <span> {i} </span>
          </span>
        );
      } else if (charSoFar > editorContext.characterLimit) {
        output.push(
          <span
            key={index}
            className={i == apiCallWord ? "word clicked" : "word"}
            onClick={() => {
              // updateClickedWord(i);
            }}
          >
            <span className="red">{i} </span>
          </span>
        );
      } else {
        let blackString = "";
        let redString = "";
        for (let j = 1; j < i.length + 1; j++) {
          if (charSoFar + j < editorContext.characterLimit)
            blackString += i[j - 1];
          else redString += i[j - 1];
        }

        output.push(
          <span
            key={index}
            className={i == apiCallWord ? "word clicked" : "word"}
            onClick={() => {
              // updateClickedWord(i);
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
      {editorContext.characterLimit == -1 ? (
        doNothing()
      ) : (
        <ul className="char-data">
          <li key="used">Used: {charactersUsed}</li>
          <li key="avaliable">
            {editorContext.characterLimit == undefined
              ? "No Limit"
              : "Avaliable: " +
                (editorContext.characterLimit - charactersUsed).toString()}
          </li>
        </ul>
      )}
    </div>
  );
}

export default EditorBody;
