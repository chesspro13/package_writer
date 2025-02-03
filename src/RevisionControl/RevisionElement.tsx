import "./revision.css";
import { useEffect } from "react";

interface outputProp {
  revisions: string[];
  updateRevisions: React.Dispatch<React.SetStateAction<string[]>>;
  characterLimit: number;
}

function RevisionElement(props: outputProp) {
  function createMarkupText(text: string) {
    let revision_text_a = "";
    let revision_text_b = "";

    // charactersUsed = getTrueSize(text);

    for (var i = 0; i < text.length; i++)
      if (i < props.characterLimit)
        revision_text_a = revision_text_a.concat(text[i]);
      else revision_text_b = revision_text_b.concat(text[i]);

    return (
      <>
        <span className="black">{revision_text_a}</span>
        <span className="red">{revision_text_b}</span>
      </>
    );
  }

  function getTrueSize(str: string) {
    let s = str.split(/\s/);
    let output = "";
    s.forEach((element) => {
      if (element != "") output += element + " ";
    });
    return output.trim().length;
  }

  function createDiv(output: string, key: number) {
    return (
      <li className="revision" key={key}>
        <div>{createMarkupText(output)}</div>
        <ul className="revision_character_list">
          <li key="used">Used: {getTrueSize(output)}</li>
          <li key="left">Left: {props.characterLimit - getTrueSize(output)}</li>
        </ul>
      </li>
    );
  }


  useEffect(() => {
    const userData = localStorage.getItem("revisions");
    if ( userData ){    
      props.updateRevisions( JSON.parse(userData) );
}}, []);
  
  function drawList() {
    let key: number = 0;

    if( props.revisions.length == 0 )
      return;

    return <ul className="revision_container" key={"list"} >
      { 
        props.revisions.map((output) => {
          return output != "" ? createDiv(output, key++) : <li style={{ listStyleType: 'none' }} key={"None"}></li>;
        })
      }
    </ul>
  }

  if (props.revisions.length == 0) return <p>No data</p>;

  return (
    <div className="revision_container">
      { drawList() }
    </div>
  );
}

export default RevisionElement;
