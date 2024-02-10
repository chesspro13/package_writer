import "./WordBank.css";

interface WordBankInterface {
  enabled: boolean;
  apiCallWord: any;
  wordBank: string[];
  setWordBank: React.Dispatch<React.SetStateAction<any>>;
}

// let placeholder =
//   '{"word":"great","synonyms":["big","enceinte","expectant","gravid","heavy","large","with child","outstanding","capital","majuscule","bang-up","bully","corking","cracking","dandy","groovy","keen","neat","nifty","not bad","old","peachy","slap-up","smashing","swell"]}';

function WordBank(props: WordBankInterface) {
  function buildContainer() {
    // if (props.wordBank == "") return <></>;
    // if (props.apiCallWord == undefined) return <></>;
    // let text = JSON.parse(props.wordBank);
    // let text = props.wordBank;

    console.log(props.wordBank);

    return (
      <div className="word_bank_container">
        <h1 className="callWord">
          {props.apiCallWord.toUpperCase().replace(/[\W]/g, "").trim()}
        </h1>
        {props.wordBank == undefined ? (
          props.wordBank
        ) : (
          <div className="suggestions">
            {props.wordBank.map((i: string, n: number) => (
              <span key={n} className="suggestion">
                {i + " "}
              </span>
            ))}
          </div>
        )}
        {/* {props.wordBank == undefined ? (
          text
        ) : text["synonyms"] ? (
          <div className="suggestions">
            {text["synonyms"].map((i: string, n: number) => (
              <span key={n} className="suggestion">
                {i + " "}
              </span>
            ))}
          </div>
        ) : (
          <div className="error">
            <span>{text["message"]}</span>
          </div>
        )} */}
      </div>
    );
  }
  if (props.enabled) return buildContainer();
  else return <></>;
}

export default WordBank;
