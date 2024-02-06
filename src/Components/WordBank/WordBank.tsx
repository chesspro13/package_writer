import "./WordBank.css";

interface WordBankInterface {
  enabled: boolean;
  apiCallWord: string;
}

let placeholder =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis dolorem debitis corporis iure sed quod eius, incidunt quidem dolor, blanditiis est facere sit. Tempore sapiente natus dolorum, quis iste beatae?";

function WordBank(props: WordBankInterface) {
  function buildContainer() {
    return (
      <div className="word_bank_container">
        <h1 className="callWord">{props.apiCallWord.toUpperCase()}</h1>
        <div className="suggestions">
          {placeholder.split(" ").map((i) => (
            <span className="suggestion">{i}</span>
          ))}
        </div>
      </div>
    );
  }
  if (props.enabled) return buildContainer();
  else return <></>;
}

export default WordBank;
