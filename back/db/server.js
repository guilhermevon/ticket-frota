const express = require("express");
const cors = require("cors");
const os = require("os");

const server = express();

const networkInterfaces = os.networkInterfaces();
const ipv4Address = "192.168.0.232";

let port;
if (process.env.API_MODE === "production") {
  port = process.env.PORT_SERVER_PROD || 9210;
} else if (process.env.API_MODE === "test") {
  port = process.env.PORT_SERVER_TEST || 9209;
} else {
  console.error("API_MODE não definido ou inválido");
  process.exit(1);
}

// Middleware para processar dados JSON
server.use(cors());
server.use(express.json({ limit: "10mb" }));

const feedbackRouter = require("./routes/feedbackRoute");
const manutencaoRouter = require("./routes/manutencaoRoute");
const solicitacaoRouter = require("./routes/solicitacaoRoute");
const userRouter = require("./routes/userRoute");

server.use("/feedback", feedbackRouter);
server.use("/manutencao", manutencaoRouter);
server.use("/solicitacao", solicitacaoRouter);
server.use("/user", userRouter);
//server.use("/execucao", execucaoRouter);
//server.use("/aprovacao", aprovacaoRouter);
//server.use("/revisaoOrcamento", revisaoOrcamentoRouter);

server.get("/", (req, res) => {
  res.json({
    solicitacao: "Hello world!",
    mensage: "Oi eu sou o servidor!",
    routes: [
      "http://" + ipv4Address + ":" + port + "/feedback",
      "http://" + ipv4Address + ":" + port + "/manutencao",
      "http://" + ipv4Address + ":" + port + "/solicitacao",
      "http://" + ipv4Address + ":" + port + "/user",
      // "http://" + ipv4Address + ":" + port + "/execucao",
      // "http://" + ipv4Address + ":" + port + "/aprovacao",
      // "http://" + ipv4Address + ":" + port + "/revisaoOrcamento",
      // "http://" + ipv4Address + ":" + port + "/imagens_defeito",
    ],
  });
  console.log(
    `Solicitação processada pelo processo http://'${ipv4Address}":"${port}`
  );
});

// Inicie o servidor
server.listen(port, () => {
  console.log(`Servidor em execução na porta ${ipv4Address} ${port} `);
});
