import "./revision.css";
import { useEditorContext } from "../Context";

interface outputProp {
  revisions: string[] | undefined;
}

function RevisionElement(props: outputProp) {
  const editorContext = useEditorContext();
  function createMarkupText(text: string) {
    let revision_text_a = "";
    let revision_text_b = "";

    // charactersUsed = getTrueSize(text);

    for (var i = 0; i < text.length; i++)
      if (i < editorContext.characterLimit)
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

  function createDiv(output: string, i: number) {
    return (
      <div className="revision">
        <div>{createMarkupText(output)}</div>
        <ul className="revision_character_list">
          <li key={"used" + i.toString()}>Used: {getTrueSize(output)}</li>
          <li key={"left" + i.toString()}>
            Left: {editorContext.characterLimit - getTrueSize(output)}
          </li>
        </ul>
      </div>
    );
  }

  function doNothing() {}

  function drawList(revisions: string[]) {
    return revisions.map((output, i) => {
      return <>{output != "" ? createDiv(output, i) : doNothing()}</>;
    });
  }

  function drawEmpty() {
    return <div className="empty">No revisions to display</div>;
  }

  if (props.revisions == undefined) return <></>;
  if (props.revisions.length == 0) return <p>No data</p>;

  return (
    <div className="revision_container">
      <ul className="revision_container">
        {props.revisions.length > 1 ? drawList(props.revisions) : drawEmpty()}
      </ul>
    </div>
  );
}

export default RevisionElement;
