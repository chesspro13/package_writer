import { useEditorContext } from "../Context";

function CharacterLimitSelector() {
  const editorContext = useEditorContext();

  function setCharLim(value: number) {
    if (value == -1) editorContext.setCharacterLimit(undefined);
    else editorContext.setCharacterLimit(value);
  }

  return (
    <div>
      Max Characters:
      <select
        defaultValue={
          editorContext.characterLimit == undefined
            ? -1
            : editorContext.characterLimit
        }
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCharLim(parseInt(e.target.value))
        }
      >
        <option value={250}>250</option>
        <option value={350}>350</option>
        <option value={700}>700</option>
        <option value={-1}>No Limit</option>
      </select>
    </div>
  );
}

export default CharacterLimitSelector;
