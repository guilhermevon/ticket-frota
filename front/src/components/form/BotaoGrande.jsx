import PropTypes from "prop-types";

const BotaoGrande = ({ text, cor, onClick }) => {
  if (cor !== "Vermelho" && cor !== "Azul") {
    console.error("Aviso: A propriedade 'cor' deve ser 'Vermelho' ou 'Azul'.");
  }
  return (
    <div style={{ marginBottom: "10px" }}>
      <button className={`btn_grande${cor}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

BotaoGrande.propTypes = {
  cor: PropTypes.string.isRequired, // cor é obrigatório
};
export default BotaoGrande;
