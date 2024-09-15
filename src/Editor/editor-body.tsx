import 'react-tabs/style/react-tabs.css';
import "./editor.css";
import { useState } from "react";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";

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
  const [packageText, setPackageText] = useState<string[]>(["","","",""]);
  let charactersUsed = 0;

  function formatOutput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPackageText([event.target.value, packageText[1], packageText[2], packageText[3]]);
  }

  function createMarkupText(text: string) {

    if ( text === undefined ){
      return <p>Output... </p>
    }

    let revision_text_a = "";
    let revision_text_b = "";

    charactersUsed = getTrueSize(text);

    if (charactersUsed < 1){
      return <p>Output...</p>
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
            <span className="red">{revision_text_b}</span>{" "}
          </>
        )}
      </>
    );
  }

  async function getAiRewrites(){
    fetch("http://localhost:27415/api/status", {
      method: "POST",
      body: JSON.stringify({package: packageText[0]}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(a => {
      a.json().then(b => {
        const data = JSON.parse(b["message"]);
        setPackageText([packageText[0], data.V1, data.V2, data.V3])
      });
    })
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
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>Standard</Tab>
            <Tab>AI V1</Tab>
            <Tab>AI V2</Tab>
            <Tab>AI V3</Tab>
          </TabList>
          <TabPanel>
            {createMarkupText(packageText[0])}
          </TabPanel>
          <TabPanel>
            {createMarkupText(packageText[1])}
          </TabPanel>
          <TabPanel>
            {createMarkupText(packageText[2])}
          </TabPanel>
          <TabPanel>
            {createMarkupText(packageText[3])}
          </TabPanel>
        </Tabs>
        
      </div>
      {props.characterLimit == -1 ? (
        doNothing()
      ) : (
        <ul className="char-data">
          <li><button onClick={getAiRewrites}>Spice it up!</button></li>
          <li>Used: {charactersUsed}</li>
          <li>Avaliable: {props.characterLimit - charactersUsed}</li>
        </ul>
      )}
    </div>
  );
}

export default EditorBody;
