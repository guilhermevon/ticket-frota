const select = ({ text, name, options, onChange, value }) => {
  const semOpcoes = options ? options.length === 0 : true;

  return (
    <div style={{ marginBottom: "10px" }}>
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        defaultValue=""
        className="cbx_padrao"
        disabled={semOpcoes} // Desabilita o select se não houver opções
        onChange={onChange}
        value={value}
      >
        <option value="" disabled hidden>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default select;
