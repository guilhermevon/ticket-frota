const express = require("express");
const { connectToDatabase, query } = require("../Db.js");

const userRoute = express.Router();

userRoute.post("/login", async (req, res) => {
    const { matricula, senha } = req.body;
  
    if (!matricula || !senha) {
      return res.status(400).send("Informe a matrícula e a senha");
    }
  
    try {
      // Conecte-se ao banco de dados
      const connection = await connectToDatabase();
  
      const sql = "SELECT * FROM user WHERE matricula = ? AND senha = ?";
      const result = await query(connection, sql, [matricula, senha]);
  
      // Feche a conexão quando não for mais necessária
      connection.end();
  
      if (result.length === 0) {
        return res.status(401).send("Credenciais inválidas");
      }
  
      const user = result[0];
  
      // Aqui você pode gerar um token de autenticação, se desejar, para manter o usuário autenticado em sessões subsequentes.
  
      res.json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao realizar o login");
    }
  });

  userRoute.get("/", async (req, res) => {
    try {
      // Conecte-se ao banco de dados
      const connection = await connectToDatabase();
  
      const sql = "SELECT * FROM user";
      const result = await query(connection, sql);
  
      // Feche a conexão quando não for mais necessária
      connection.end();
  
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao consultar o banco de dados");
    }
  });