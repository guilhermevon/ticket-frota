const express = require("express")
const { connectToDatabase, query } = require("../Db.js")

const feedbackRoute = useRouter();

feedbackRoute.get("/", async (req, res) => {
    try {
      // Conecte-se ao banco de dados
      const connection = await connectToDatabase();
  
      const sql = "SELECT * FROM feedback";
      const result = await query(connection, sql);
  
      // Feche a conexão quando não for mais necessária
      connection.end();
  
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao consultar o banco de dados");
    }
  });

  


