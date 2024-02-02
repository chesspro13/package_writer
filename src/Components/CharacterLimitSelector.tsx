interface SelectionEvent {
  setCharacterLimit: React.Dispatch<React.SetStateAction<number>>;
}

function CharacterLimitSelector(props: SelectionEvent) {
  return (
    <div>
      Max Characters:
      <select
        defaultValue={350}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          props.setCharacterLimit(parseInt(e.target.value))
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
