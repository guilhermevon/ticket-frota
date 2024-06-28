const InputGrande = ({ type, text, name, placeholder, onChange, value }) => {
    return (
      <div style={{ marginBottom: "10px" }}>
        {text && <label htmlFor={name}>{text}:</label>}
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className="inp_grande"
        />
      </div>
    );
  };
  export default InputGrande;
  