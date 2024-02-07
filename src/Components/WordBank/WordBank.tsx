import "./WordBank.css";

interface WordBankInterface {
  enabled: boolean;
  apiCallWord: string;
  wordBank: string;
  setWordBank: React.Dispatch<React.SetStateAction<string>>;
}

// let placeholder =
//   '{"word":"great","synonyms":["big","enceinte","expectant","gravid","heavy","large","with child","outstanding","capital","majuscule","bang-up","bully","corking","cracking","dandy","groovy","keen","neat","nifty","not bad","old","peachy","slap-up","smashing","swell"]}';

function WordBank(props: WordBankInterface) {
  function buildContainer() {
    if (props.wordBank == "") return <></>;
    let text = JSON.parse(props.wordBank)["synonyms"];

    return (
      <div className="word_bank_container">
        <h1 className="callWord">{props.apiCallWord.toUpperCase()}</h1>
        <div className="suggestions">
          {props.wordBank
            ? text.map((i: string) => <span className="suggestion">{i}</span>)
            : "Something went wrong"}
        </div>
      </div>
    );
  }
  if (props.enabled) return buildContainer();
  else return <></>;
}

export default WordBank;
