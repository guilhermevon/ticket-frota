const express = require("express");
const { connectToDatabase, query } = require("../Db.js"); // Importe a função query
const { de, tr } = require("date-fns/locale");

const manuetncoesRouter = express.Router();
// ? Rota para obter o próximo ID de requisição
manuetncoesRouter.get("/proximo-id", async (req, res) => {
  const sql = "SELECT MAX(idsolicitacao) AS max_id FROM solicitacao";
  try {
    const connection = await connectToDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    const nextId = result[0].max_id + 1; // Obtém o último ID e incrementa 1

    res.json({ nextId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

manuetncoesRouter.get("/", async (req, res) => {
  const sql = "SELECT * FROM solicitacao";
  try {
    const connection = await connectToDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});
