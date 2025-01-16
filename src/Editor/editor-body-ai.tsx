import "react-tabs/style/react-tabs.css";
import "./editor.css";
import { useEffect, useState } from "react";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import axios from "axios";

const API_URL = "API";
const PING_TIME = 2

interface setterProps {
  output_setter: React.Dispatch<React.SetStateAction<string>>;
  characterLimit: number;
}

type jsonFormat = {
  input: string;
  ai: {
    response_1: {
      revision: string;
      feedback: string;
    };
    response_2: {
      revision: string;
      feedback: string;
    };
    response_3: {
      revision: string;
      feedback: string;
    };
    feedback: string;
  };
};

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

function checkForSavedData(){
  const data = localStorage.getItem("user-input");
  if ( data )
    return data;
  else
    return ""
}

function getTrueSize(str: string) {
  return cleanupText(str).length;
}

function EditorBody(props: setterProps) {
  const [packageText, setPackageText] = useState<jsonFormat>(
    setInput("", "", "", "")
  );
  const [jobInQueue, setJobInQueue] = useState(false);
  const [jobID, setJobID] = useState<string | null>()
  // const [jobStatus, setJobStatus] = useState<string | null>();
  let charactersUsed = 0;

  function postParse(data: {
    V1: string;
    V2: string;
    V3: string;
    V1_Reason: string;
    V2_Reason: string;
    V3_Reason: string;
    Feedback: string;
  }) {
    setPackageText({
      input: packageText.input,
      ai: {
        response_1: {
          revision: data.V1,
          feedback: data.V1_Reason,
        },
        response_2: {
          revision: data.V2,
          feedback: data.V2_Reason,
        },
        response_3: {
          revision: data.V3,
          feedback: data.V3_Reason,
        },
        feedback: data.Feedback,
      },
    });
  }

  function setInput(
    input: string,
    revision: string,
    feedback_1: string,
    feedback_2: string
  ) {
    return {
      input: input,
      ai: {
        response_1: {
          revision: revision,
          feedback: feedback_1,
        },
        response_2: {
          revision: revision,
          feedback: feedback_1,
        },
        response_3: {
          revision: revision,
          feedback: feedback_1,
        },
        feedback: feedback_2,
      },
    };
  }

  function formatOutput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPackageText({
      input: event.target.value,
      ai: {
        response_1: {
          revision: packageText.ai.response_1.revision,
          feedback: packageText.ai.response_1.feedback,
        },
        response_2: {
          revision: packageText.ai.response_2.revision,
          feedback: packageText.ai.response_2.feedback,
        },
        response_3: {
          revision: packageText.ai.response_3.revision,
          feedback: packageText.ai.response_3.feedback,
        },
        feedback: packageText.ai.feedback,
      },
    });

    localStorage.setItem("user-input", event.target.value);
  }

  function createMarkupText(text: string, feedback: string, tracked: boolean) {
    if (text === undefined) {
      return <p>Output... </p>;
    }

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

  async function axiosgetAiRewrites() {
    if (API_URL === undefined) throw new Error("API UNDEFINED");

    const source = axios.CancelToken.source();
    const timeout = setTimeout(() => {
      setPackageText(
        setInput(
          packageText.input,
          "Generation Failed.",
          "",
          "Generation Failed."
        )
      );
      source.cancel();
    }, 300000);
    setPackageText(
      setInput(packageText.input, "Generating...", "", "Generating...")
    );

    await axios
      .post(API_URL + "/api/queue", {
        timeout: 300000,
        cancelToken: source.token,
        data: { package: packageText.input, current_job: jobID },
      })
      .then((response) => {
        if (response.status == 200) {
          setJobInQueue(true);
          setJobID(response.data.jobID)
          // setJobStatus(response.data.status)
          console.log("Job added to queue with ID: " + response.data.jobID);
        } else
          setPackageText(
            setInput(
              packageText.input,
              "Generation Failed.",
              "",
              "Generation Failed."
            )
          );
          clearTimeout(timeout);
      })
      .catch((reason) => {
        console.log(reason);
        setPackageText(
          setInput(
            packageText.input,
            "Generation Failed.",
            "",
            "Generation Failed."
          )
        );
      });
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (jobInQueue) {
      interval = setInterval(() => {
        getData();
      }, PING_TIME * 1000); // Call API every X seconds to see if the job is done

      return () => clearInterval(interval);
    }

    return () => {};

  }, [jobInQueue, jobID]);

  useEffect(() => {
    setPackageText( setInput(checkForSavedData(), "Output...", "Output...","Output...")) ;
  }, []);

  async function getData(){
    console.log("Status of: " + jobID)
    await axios
      .post(API_URL + "/api/status/" + jobID, {
        timeout: 300000,
        // cancelToken: source.token,
        data: { token: "NEED TO ADD VERIFICATION TOKENS!!!" }, // VERIFICATION TOKEN
      })
      .then((response) => {
        if (response.status == 200) {
          console.log("Response data; " + response.data.status + " time left: " + response.data.timeRemaining)
          if (response.data.status == "completed")
          {
            setJobInQueue(false);
            setJobID(null)
            // setJobStatus(null)
            postParse(JSON.parse(response.data.data));
          }else{
            setInput(packageText.input, "Generating...", "", "Generating...")
          }
        } else
          setPackageText(
            setInput(
              packageText.input,
              "Generation Failed.",
              "",
              "Generation Failed."
            )
          );
      })
      .catch((reason) => {
        console.log(reason);
        setPackageText(
          setInput(
            packageText.input,
            "Generation Failed.",
            "",
            "Generation Failed."
          )
        );
      });
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
          <TabPanel>{createMarkupText(packageText.input, "", true)}</TabPanel>
          <TabPanel>
            {createMarkupText(
              packageText.ai.response_1.revision,
              packageText.ai.response_1.feedback,
              false
            )}
          </TabPanel>
          <TabPanel>
            {createMarkupText(
              packageText.ai.response_2.revision,
              packageText.ai.response_2.feedback,
              false
            )}
          </TabPanel>
          <TabPanel>
            {createMarkupText(
              packageText.ai.response_3.revision,
              packageText.ai.response_3.feedback,
              false
            )}
          </TabPanel>
          <TabPanel>
            <p>{packageText.ai.feedback}</p>
          </TabPanel>
        </Tabs>
      </div>
      {props.characterLimit == -1 ? (
        doNothing()
      ) : (
        <ul className="char-data">
          <li>
            <button onClick={axiosgetAiRewrites}>Spice it up!</button>
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
