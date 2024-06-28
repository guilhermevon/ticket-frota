import PropTypes from "prop-types";

const BotaoPequeno = ({ text, cor, type, onClick }) => {
  if (cor !== "Vermelho" && cor !== "Azul" && cor !== "") {
    console.error("Aviso: A propriedade 'cor' deve ser 'Vermelho' ou 'Azul'.");
  }
  return (
    <div style={{ marginBottom: "10px" }}>
      <button type={type} className={`btn_pequeno${cor}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

BotaoPequeno.propTypes = {
  cor: PropTypes.string.isRequired, // cor é obrigatório
};
export default BotaoPequeno;
