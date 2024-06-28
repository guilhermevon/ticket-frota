import React, { useState } from "react";

import PropTypes from "prop-types";

const BotaoAlterna = ({ options, onChange, name, text, posicao }) => {
  if (posicao !== "Vertical" && posicao !== "Horizontal") {
    console.error(
      "Aviso: A propriedade 'posicao' deve ser 'Vertical' ou 'Horizontal'."
    );
  }
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onChange(option);
  };
  return (
    <div>
      <label htmlFor={name}>{text}:</label>
      <div className={`btn_alterna${posicao}`}>
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              value={selectedOption === option ? option : ""}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};
BotaoAlterna.propTypes = {
  posicao: PropTypes.string.isRequired, // posicao é obrigatório
};
export default BotaoAlterna;
