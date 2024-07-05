const express = require("express");
const { connectToDatabase, query } = require("../Db.js");

const app = express();
const port = 3001;

const solicitacaoRouter = express.Router();

solicitacaoRouter.get("/", async (req, res) => {
  const sql = "SELECT * FROM solicitacao";
  try {
    const connection = await connectToDatabase(); // Conecte-se ao banco de dados

    const result = await query(connection, sql);

    // Feche a conexão quando não for mais necessária
    connection.end();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

solicitacaoRouter.post("/create", async (req, res) => {
  const {
    placa_veiculo,
    quilometragem,
    defeito,
    veiculo_parado,
    matricula_solicitanete,
    nome_solicitante,
    data_solicitacao,
    base,
    tipo_solicitacao,
    tipo_veiculo,
  } = req.body;

  try {
    const result = await query(
      "INSERT INTO solicitacoes (placa_veiculo, quilometragem, defeito, veiculo_parado, matricula_solicitanete, nome_solicitante, data_solicitacao, base, tipo_solicitacao, tipo_veiculo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        placa_veiculo,
        quilometragem,
        defeito,
        veiculo_parado,
        matricula_solicitanete,
        nome_solicitante,
        data_solicitacao,
        base,
        tipo_solicitacao,
        tipo_veiculo,
      ]
    );
    res.status(201).json({ message: "Solicitação criada com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar solicitação" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
