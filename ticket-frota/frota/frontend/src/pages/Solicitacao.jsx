import React, { useState, useEffect, UserContext } from "react";
//import axios from "axios";
import Input from "../components/form/Input";
import InputPesquisa from "../components/form/InputPesquisa";
import Select from "../components/form/Select";
import Styles from "./Solicitacao.module.css";
import BotaoPequeno from "../components/form/BotaoPequeno";

const Solicitacao = () => {
  const [placaVeiculo, setPlacaVeiculo] = useState(null);
  const [tipoVeiculo, setTipoVeiculo] = useState(null);
  const [base, setBase] = useState(null);
  const [matricula, setMatricula] = useState(null);
  const [nome, setNome] = useState(null);
  const [dataSolicitacao, setDataSolicitacao] = useState(null);

  return (
    <>
      <form className={Styles.container} /*onSubmit={handleSubmit}*/>
        <div>
          <div>
            <h1>SOLICITAÇÃO DE MANUTENÇÃO DE VEÍCULO</h1>
          </div>
          <div className={Styles.organizaHorizontal}>
            <InputPesquisa text="Placa do Veiculo" placeholder="N° da Placa" />
            <Input text="Tipo do Veiculo" placeholder="Tipo do Veículo" />
            <Select
              text="Base"
              options={["Selecione uma opção", "Betim", "Sete Lagoas"]}
            />
            <Input text="N° Ordem" placeholder="N° Ordem Solicitação" />
          </div>
          <div className={Styles.organizaHorizontal}>
            <Input text="KM do veículo" placeholder="N° KM" />
            <Input text="Defeito Macro" placeholder="Localização do Defeito" />
            <Input text="Veículo parado" placeholder="Sim/Não" />
            <InputPesquisa
              text="Matricula do Solicitante"
              placeholder="Matricula"
            />
          </div>
          <div className={Styles.organizaHorizontal}>
            <InputPesquisa text="Nome do Solicitante" placeholder="Nome" />
            <div className={Styles.organizaHorizontal}>
              <Input
                type="date"
                text="Data de Solicitação*"
                name="data_retirada"
                placeholder={"dd/mm/aaaa"}
              />
            </div>
          </div>
          <div className={Styles.organizaHorizontal}>
            <BotaoPequeno text="Adicionar" cor="Azul" />
            <BotaoPequeno text="Cancelar" cor="Vermelho" />
          </div>
        </div>
      </form>
    </>
  );
};

export default Solicitacao;
