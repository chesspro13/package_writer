import "react-tabs/style/react-tabs.css";
import "./editor.css";
import { useEffect, useState } from "react";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { getTrueSize, checkForSavedData, doNothing, createMarkupText, getTabComponents, updateJson, getFeedbackTabComponents, axiosGetPromptedAiRewrites } from "./editor-components"
import { getData, checkForSavedPrompt, axiosgetAiRewrites } from "./editor-components";
import { setInput, } from "./editor-components";
import { setterProps, jsonFormat } from "./definitions";

const mode = import.meta.env.VITE_MODE;

function EditorBody(props: setterProps) {
  const [packageText, setPackageText] = useState<jsonFormat>(
    setInput("", "", "", "")
  );
  const [jobInQueue, setJobInQueue] = useState(false);
  const [jobID, setJobID] = useState<string | null>();
  const [prompt, setPrompt] = useState("");


  /**
 * Handles loading data from storage on a new session
 */
  useEffect(() => {
    setPackageText(setInput(checkForSavedData(), "", "", ""));
    if (mode == "prompt")
      setPrompt(checkForSavedPrompt());
  }, []);


  /**
 * Used by AI enabled modes to periodically ping the server for updates to the job
 */
  if (mode == "ai" || mode == "prompt")
    useEffect(() => {
      let interval: NodeJS.Timeout;
      const delay = (process.env.REACT_APP_PING_DELAY === undefined ? 1 :
        parseInt(process.env.REACT_APP_PING_DELAY));

      if (jobInQueue) {
        interval = setInterval(() => {
          getData(packageText, setPackageText, setJobInQueue, jobID, setJobID);
        }, delay * 1000); // Call API every X seconds to see if the job is done

        return () => clearInterval(interval);
      }
      return () => { };
    }, [jobInQueue, jobID]);




    function updatePrompt(event: React.ChangeEvent<HTMLTextAreaElement>) {
      setPrompt( event.target.value );
      localStorage.setItem("user-prompt", event.target.value);
    }

  /**
 * Handles the change event of a textarea, updates the package text state,
 * and saves the user input to local storage.
 *
 * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event triggered by the textarea.
 */
  function formatOutput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPackageText(updateJson(packageText, event));
    localStorage.setItem("user-input", event.target.value);
  }

  /**
 * Calls the api to get a rewrite
 */
  function aiReWrites(): void {
    if ( mode === "ai")
      axiosgetAiRewrites(packageText, setPackageText, setJobInQueue, jobID, setJobID);
    else if ( mode === "prompt")
      axiosGetPromptedAiRewrites(packageText, setPackageText, setJobInQueue, jobID, setJobID, prompt);
  }

  return (
    <div className="editor">
      {mode === "prompt" ?
        <textarea
          className="input editorBox"
          placeholder="prompt here..."
          wrap="hard"
          onChange={updatePrompt}
          value={checkForSavedPrompt()}
        /> : doNothing()}
      <textarea
        className="input editorBox"
        placeholder="Package data here..."
        wrap="hard"
        onChange={formatOutput}
        value={checkForSavedData()}
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
            {createMarkupText(packageText.input, "", true, props.characterLimit, props.output_setter)}
          </TabPanel>
          {getTabComponents(packageText.ai.response_1.revision, packageText.ai.response_1.feedback)}
          {getTabComponents(packageText.ai.response_2.revision, packageText.ai.response_2.feedback)}
          {getTabComponents(packageText.ai.response_3.revision, packageText.ai.response_3.feedback)}
          {getFeedbackTabComponents(packageText)}
        </Tabs>
      </div>
      {props.characterLimit == -1 ? (
        doNothing()
      ) : (
        <ul className="char-data">
          <li>
            {(() => {
              switch (mode) {
                case "prompt":
                case "ai":
                  return <button disabled={false} onClick={aiReWrites}>Spice it up!</button>;
                case "local":
                default:
                  return <button disabled={true}>Spice it up!</button>
              }
            })()}
          </li>
          <li>Used: {getTrueSize(packageText.input)}</li>
          <li>
            Avaliable: {props.characterLimit - getTrueSize(packageText.input)}
          </li>
        </ul>
      )}
    </div>
  );
}

export default EditorBody;
