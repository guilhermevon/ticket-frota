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
    if (onChange) {
      const event = {
        target: {
          name,
          value: option,
        },
      };
      onChange(event); 
    }
  };

  return (
    <div>
      <label htmlFor={name}>{text}:</label>
      <div className={`btn_alterna${posicao}`}>
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              value={option}
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
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  posicao: PropTypes.oneOf(["Vertical", "Horizontal"]).isRequired,
};

BotaoAlterna.defaultProps = {
  onChange: () => {},
};

export default BotaoAlterna;
