import "react-tabs/style/react-tabs.css";
import "./editor.css";
import { useEffect, useState } from "react";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";

interface setterProps {
  output_setter: React.Dispatch<React.SetStateAction<string>>;
  characterLimit: number;
}

function doNothing() {
  return <div></div>;
}

function cleanupText(str: string) {
  let s = str.split(/\s/);
  let output = "";
  s.forEach((element) => {
    if (element.length != 0) output += element + " ";
  });
  return output.trim();
}

function getTrueSize(str: string) {
  return cleanupText(str).length;
}

function checkForSavedData(){
    const data = localStorage.getItem("user-input");
    if ( data )
      return data;
    else
      return ""
}

function EditorBody(props: setterProps) {
  const [packageText, setPackageText] = useState("");
  let charactersUsed = 0;

  function formatOutput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPackageText(event.target.value);
    localStorage.setItem("user-input", event.target.value);
  }

  function createMarkupText(text: string, feedback: string, tracked: boolean) {
    if (text === undefined) {
      return <p>Output... </p>;
    }

    useEffect(() => {
      setPackageText( checkForSavedData() );
    }, []);

    text = cleanupText(text);

    let revision_text_a = "";
    let revision_text_b = "";

    charactersUsed = getTrueSize(text);

    if (charactersUsed < 1 && !tracked) {
      return <p>Output...</p>;
    }

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
            <span className="red">{revision_text_b}</span> <br />
            <br />
            <br />
            <span>
              <i>{feedback}</i>
            </span>
          </>
        )}
      </>
    );
  }



  function feedbackText(text: string, feedback: string) {
    if (text === undefined) {
      return <p>Output... </p>;
    }


    return (
      <>
          <>
            <span className="black">{text}</span>
            <br />
            <br />
            <br />
            <span>
              <i>{feedback}</i>
            </span>
          </>
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
        value={ checkForSavedData() }
      />

      <div className="output editorBox">
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>Standard</Tab>
            <Tab>AI V1</Tab>
            <Tab>AI V2</Tab>
            <Tab>AI V3</Tab>
            <Tab>Feedback</Tab>
          </TabList>
          <TabPanel>
            {createMarkupText(packageText, "", true)}</TabPanel>
          <TabPanel>
            {feedbackText(
              "Local version only",
              "For AI functionality, go to https://packagesmith.mauldin314.com"
            )}
          </TabPanel>
          <TabPanel>
            {feedbackText(
              "Local version only",
              "For AI functionality, go to https://packagesmith.mauldin314.com"
            )}
          </TabPanel>
          <TabPanel>
            {feedbackText(
              "Local version only",
              "For AI functionality, go to https://packagesmith.mauldin314.com"
            )}
          </TabPanel>
          <TabPanel>
            <p>For AI functionality, go to https://packagesmith.mauldin314.com</p>
          </TabPanel>
        </Tabs>
      </div>
      {props.characterLimit == -1 ? (
        doNothing()
      ) : (
        <ul className="char-data">
          <li>
            <button disabled={true}>Spice it up!</button>
          </li>
          <li>Used: {getTrueSize(packageText)}</li>
          <li>
            Avaliable: {props.characterLimit - getTrueSize(packageText)}
          </li>
        </ul>
      )}
    </div>
  );
}

export default EditorBody;
