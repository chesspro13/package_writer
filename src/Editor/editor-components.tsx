import { TabPanel } from "react-tabs";
import { jsonFormat } from "./definitions";

import axios from "axios";

const mode = import.meta.env.VITE_MODE;
const api = import.meta.env.VITE_API;

export function postParse(packageText: string, data: {
  V1: {
    new_statement: string;
    reasoning: string;
  },
  V2: {
    new_statement: string;
    reasoning: string;
  },
  V3: {
    new_statement: string;
    reasoning: string;
  },
  Feedback: string;
}): jsonFormat {
  return {
    input: packageText,
    ai: {
      response_1: {
        revision: data.V1.new_statement,
        feedback: data.V1.reasoning,
      },
      response_2: {
        revision: data.V2.new_statement,
        feedback: data.V2.reasoning,
      },
      response_3: {
        revision: data.V3.new_statement,
        feedback: data.V3.reasoning,
      },
      feedback: data.Feedback,
    },
  };
}


export function setInput(
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

export function getTrueSize(str: string) {
  return cleanupText(str).length;
}

export function cleanupText(str: string) {
  let s = str.split(/\s/);
  let output = "";
  s.forEach((element) => {
    if (element.length != 0) output += element + " ";
  });
  return output.trim();
}

export function checkForSavedData(): string {
  const data = localStorage.getItem("user-input");
  if (data)
    return data.toString();
  else
    return ""
}

export function doNothing() {
  return <div></div>;
}

export function updateJson(packageText: jsonFormat, event: React.ChangeEvent<HTMLTextAreaElement>): jsonFormat {
  return {
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
  };
}

/**
 * Creates markup with all characters that exceed the character limit with red text.
 *
 * @param {string} text - The input text to be processed.
 * @param {string} feedback - Feedback message to be displayed along with the text.
 * @param {boolean} tracked - Indicates whether tracking is enabled for the text.
 * @param {number} characterLimit - The maximum number of characters allowed before splitting the text into red overflow.
 * @param {React.Dispatch<React.SetStateAction<string>>} output_setter - A function to update the state with the processed text.
 * @returns {JSX.Element} - Returns a JSX element containing the formatted text and feedback message.
 */
export function createMarkupText(text: string, feedback: string, tracked: boolean, characterLimit: number, output_setter: React.Dispatch<React.SetStateAction<string>>) {
  if (text === undefined) {
    return <p>Output... </p>;
  }

  text = cleanupText(text);

  let revision_text_a = "";
  let revision_text_b = "";

  const charactersUsed = getTrueSize(text);

  if (charactersUsed < 1 && !tracked) {
    return <p>Output...</p>;
  }

  for (var i = 0; i < text.length; i++)
    if (i < characterLimit)
      revision_text_a = revision_text_a.concat(text[i]);
    else revision_text_b = revision_text_b.concat(text[i]);

  output_setter(text);

  return (
    <>
      {characterLimit == -1 ? (
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

/**
 * Sends a POST request to add a job to the AI rewrite queue.
 *
 * @async
 * @function axiosgetAiRewrites
 * 
 * @param {jsonFormat} packageText - The input data in JSON format that needs to be rewritten by AI.
 * @param {React.Dispatch<React.SetStateAction<jsonFormat>>} setPackageText - A React state setter function for updating the package text.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setJobInQueue - A React state setter function for indicating whether a job is in queue.
 * @param {string | null | undefined} jobID - The ID of the current job, if available.
 * @param {React.Dispatch<React.SetStateAction<string | null | undefined>>} setJobID - A React state setter function for updating the job ID.
 *
 * @throws Will throw an error if VITE_API environment variable is not defined.
 * 
 * @description
 * This function makes a POST request to the AI rewrite queue endpoint specified by the VITE_API environment variable.
 * It updates the package text to indicate that generation is in progress and sets a timeout to handle cases where the server does not respond within 5 minutes.
 * On successful response, it updates the state to reflect that a job is now in the queue and saves the job ID. 
 * If there's an error or the request times out, it updates the package text to indicate failure.
 */
export async function axiosgetAiRewrites(packageText: jsonFormat, setPackageText: React.Dispatch<React.SetStateAction<jsonFormat>>, setJobInQueue: React.Dispatch<React.SetStateAction<boolean>>,
  jobID: string | null | undefined, setJobID: React.Dispatch<React.SetStateAction<string | null | undefined>>
) {
  if (import.meta.env.VITE_API === undefined) throw new Error("API UNDEFINED");

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
    .post(import.meta.env.VITE_API + "/api/queue", {
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


export async function axiosGetPromptedAiRewrites(packageText: jsonFormat, setPackageText: React.Dispatch<React.SetStateAction<jsonFormat>>, setJobInQueue: React.Dispatch<React.SetStateAction<boolean>>,
  jobID: string | null | undefined, setJobID: React.Dispatch<React.SetStateAction<string | null | undefined>>, prompt: string) {
  if (api === undefined) throw new Error("API UNDEFINED");

  const source = axios.CancelToken.source();
  const timeout = setTimeout(() => {
    setPackageText(
      setInput(
        packageText.input,
        "Generation Failed - A",
        "",
        "Generation Failed - A"
      )
    );
    source.cancel();
  }, 300000);
  

  await axios
    .post(api + "/api/prompt-queue", {
      timeout: 300000,
      cancelToken: source.token,
      data: { package: packageText.input, current_job: jobID, prompt: prompt },
    })
    .then((response) => {
      if (response.status == 200) {
        setJobInQueue(true);
        setJobID(response.data.jobID)
        // setJobStatus(response.data.status)
        console.log("Job added to queue with ID: " + response.data.jobID);
        setPackageText(
          setInput(packageText.input, "Waiting for AI server...", "", "Waiting for AI server...")
        );
      } else if( response.status == 500)
      {
        setPackageText(
          setInput(
            packageText.input,
            "Generation Failed - B",
            "",
            "Generation Failed - B"
          )
        );
        clearTimeout(timeout);
      }
    })
    .catch((reason) => {
      console.log(reason);
      setPackageText(
        setInput(
          packageText.input,
          "Generation Failed - C",
          "",
          "Generation Failed - C"
        )
      );
    });
}

export function checkForSavedPrompt() {
  const data = localStorage.getItem("user-prompt");
  if (data) {
    return data;
  }
  else {
    const default_prompt = `Narrative Statements are a narrative style used to communicate accomplishments and results in the United States Air Force. They should be efficient and increase clarity of an Airman's performance.
      In the United States Air Force, Narrative Statements should be a standalone sentence with action and at least one of impact or results/outcome and written in plain language without uncommon acronyms and abbreviations.
      The first word of a narrative statement should be a strong action verb.
      The performance statement should be one sentence and written in past tense. It should also include transition words like "by" and "which".
      Personal pronouns (I, me, my, we, us, our, etc.) should not be used.
      Rewrite the USER prompt to follow these conventions. 
      Generate Three seporate and unique ways to rewrite what you were given in JSON format labled "V1", "V2", and "V3", and how it has improved in "V1_Reason", "V2_Reason", and "V3_Reason".
      Generate impartial feedback on how the user can improve the statement in a JSON object labled "Feedback"`;
    return default_prompt;
  }
}

export

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


export async function getData(packageText: jsonFormat, setPackageText: React.Dispatch<React.SetStateAction<jsonFormat>>, setJobInQueue: React.Dispatch<React.SetStateAction<boolean>>,
  jobID: string | null | undefined, setJobID: React.Dispatch<React.SetStateAction<string | null | undefined>>) {
  await axios
    .get(import.meta.env.VITE_API + "/api/status/" + jobID, {
      timeout: 300000,
      // cancelToken: source.token,
      data: { token: "NEED TO ADD VERIFICATION TOKENS!!!" }, // VERIFICATION TOKEN
    })
    .then((response) => {

      if (response.status == 200) {
        if (response.data.status == "completed") {
          setJobInQueue(false);
          setJobID(null)
          setPackageText(postParse(packageText.input, JSON.parse(response.data.data.trim())));
        } else if (response.data.status == "waiting") {
          setPackageText(
            setInput(packageText.input, "Job in que #" + response.data.position + "...", "", "Job in que #" + response.data.position + "...")
          );
        } else if (response.data.status == "active") {
          setPackageText(
            setInput(packageText.input, "Generating...", "", "Generating...")
          );
        }
      } else {
        setPackageText(
          setInput(
            packageText.input,
            "Generation Failed - D",
            "",
            "Generation Failed - D"
          )
        );
      }
    })
    .catch((reason) => {
      console.log(reason);
      setPackageText(
        setInput(
          packageText.input,
          "Generation Failed - E",
          "",
          "Generation Failed - E"
        )
      );
    });
}

export function localOnlytab(): React.ReactElement {
  return <TabPanel>
    {feedbackText(
      "Local version only",
      "For AI functionality, go to " + import.meta.env.VITE_AI_URL
    )}
  </TabPanel>
}

export function getTabComponents(revision: string | undefined, feedback: string | undefined) {
  switch (mode) {
    case "prompt":
    case "ai":
      if ( revision === undefined || feedback === undefined )
        return localOnlytab();

      return <TabPanel>
        {feedbackText(
          revision,
          feedback
        )}
      </TabPanel>
    case "local":
    default:
      return localOnlytab();
  }
}

export function getFeedbackTabComponents(packageText: jsonFormat) {
  switch (mode) {
    case "prompt":
    case "ai":
      return <TabPanel><p>{packageText.ai.feedback}</p></TabPanel>
    case "local":
    default:
      return localOnlytab();
  }
}
