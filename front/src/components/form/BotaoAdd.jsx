const BotaoAdd = ({ onClick }) => {
    return (
      <div style={{ marginBottom: "10px" }}>
        <button className="btn_adicionar" onClick={onClick}>
          +
        </button>
      </div>
    );
  };
  export default BotaoAdd;
  