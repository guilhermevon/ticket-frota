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
  //const [objeto, setObjeto] = useState({}); //[{}
  const [inputValue, setInputValue] = useState(value); //""

  const [filterSearch, setFilterSearch] = useState([]);
  const [inputSearch, setInputSearch] = useState(""); //""

  useEffect(() => {
    setInputValue(value);
    setInputSearch(value);

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
    if (inputSearch === "") return setFilterSearch([]);
  }, [value]);

  const handleClickAutoComplete = (dado) => {
    setInputValue(
      dado.nome ? dado.nome : dado.username ? dado.username : dado ? dado : ""
    );
    setInputSearch("");
    onSelect(dado);
    setFilterSearch([]);
    ///mandao o dado.id e
  };

  return (
    <>
      <div>
        <div className={styles.containerAutoComplete}>
          {text && <label htmlFor={name}>{text}:</label>}
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={onChange}
            maxLength={maxLength}
            pattern={pattern}
            value={inputValue}
            className="inp_lupa"
            autocomplete="off"
          />
        </div>
        {filterSearch !== 0 && (
          <div className={styles.dataItem}>
            <>
              {filterSearch.map((value) => (
                <div
                  className={styles.item}
                  key={value.id}
                  onClick={() => {
                    handleClickAutoComplete(value);
                  }}
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
            </>
          </div>
        )}
      </div>
    </>
  );
};
export default InputPesquisa;
