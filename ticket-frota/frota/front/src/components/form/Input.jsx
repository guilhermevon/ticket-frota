const Input = ({
    type,
    text,
    name,
    placeholder,
    onChange,
    value,
    pattern,
    onInput,
    maxLength,
  }) => {
    return (
      <div style={{ marginBottom: "10px", color: "#163047"}}>
        {text && <label htmlFor={name}>{text}:</label>}
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          pattern={pattern}
          onInput={onInput}
          maxLength={maxLength}
          className="inp_padrao"
          //style={{width: "204px"}}
          multiple
        />
      </div>
    );
  };
  export default Input;