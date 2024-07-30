import { useState, useEffect } from "react";
import styles from "./InputPesquisa.module.css";

const InputPesquisa = ({
  type,
  text,
  name,
  onChange,
  value = "",
  onSelect,
  placeholder,
  data,
  maxLength,
  pattern,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [filterSearch, setFilterSearch] = useState([]);

  useEffect(() => {
    setInputValue(value);
    if (!value) return;

    const filtered = data.filter((item) => {
      if (!item) return false;
      if (typeof item === "string") {
        return item.toLowerCase().includes(value.toLowerCase());
      }
      if (item.nome) {
        return item.nome.toLowerCase().includes(value.toLowerCase());
      }
      if (item.username) {
        return item.username.toLowerCase().includes(value.toLowerCase());
      }
      return false;
    });

    setFilterSearch(filtered);
    if (value === "") setFilterSearch([]);
  }, [value, data]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(event);  // Chama a função onChange passada como props
  };

  const handleClickAutoComplete = (dado) => {
    setInputValue(
      dado.nome ? dado.nome : dado.username ? dado.username : dado ? dado : ""
    );
    onSelect(dado);
    setFilterSearch([]);
  };

  return (
    <div>
      <div className={styles.containerAutoComplete}>
        {text && <label htmlFor={name}>{text}:</label>}
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleInputChange}
          maxLength={maxLength}
          pattern={pattern}
          value={inputValue}
          className="inp_lupa"
          autoComplete="off"
        />
      </div>
      {filterSearch.length > 0 && (
        <div className={styles.dataItem}>
          {filterSearch.map((value) => (
            <div
              className={styles.item}
              key={value.id}
              onClick={() => handleClickAutoComplete(value)}
            >
              <p>
                {value.nome
                  ? value.nome
                  : value.username
                  ? value.username
                  : value
                  ? value
                  : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputPesquisa;
