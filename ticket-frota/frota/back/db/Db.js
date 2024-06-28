const mysql = require("mysql");
const { dbConfig, dbOffConfig } = require("./dbConfig.js");

// Função para conectar ao banco de dados principal
async function connectToDatabase() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
      if (err) {
        console.error("Erro ao conectar ao servidor:", err);
        reject(err);
      } else {
        console.log("Conectado ao banco de dados MySQL");
        resolve(connection);
      }
    });
  });
}

// Função para conectar ao banco de dados offline
async function connectToOfflineDatabase() {
  return new Promise((resolve, reject) => {
    const connectionOff = mysql.createConnection(dbOffConfig);

    connectionOff.connect((err) => {
      if (err) {
        console.error("Erro ao conectar ao servidor offline:", err);
        reject(err);
      } else {
        console.log("Conectado ao banco de dados MySQL offline");
        resolve(connectionOff);
      }
    });
  });
}

// Função para executar consultas SQL
function query(connection, sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = { connectToDatabase, connectToOfflineDatabase, query };
