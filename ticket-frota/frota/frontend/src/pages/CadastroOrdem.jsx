import React, { useState, useEffect, UserContext } from "react";
//import axios from "axios";
import Input from "../components/form/Input";
import InputPesquisa from "../components/form/InputPesquisa";
import Select from "../components/form/Select";
import Styles from "./Solicitacao.module.css";
import BotaoPequeno from "../components/form/BotaoPequeno";

const CadastroOrdem = () => {
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [fornecedor, setFornecedor] = useState("");

  return (
    <>
      <form className={Styles.container} /*onSubmit={handleSubmit}*/>
        <h1>CADASTRO DE ORDEM DE PAGAMENTO</h1>
        <div className={Styles.organizaHorizontal}>
          <Input text="Atividade/Descritivo Custo*" placeholder="Descrição de Custo"/>
          <Input text="Empresa" placeholder="N° Laudo"/>
          <Select
            text="Departamento"
            options={["Selecione uma opção", "Betim", "Sete Lagoas"]}
            placeholder="Nome do Departamento*"
          />
          <Input text="N°Ordem*" placeholder="N° Ordem Pagamento"/>
        </div>
        <div className={Styles.organizaHorizontal}>
          <Input text="CC*" placeholder="N° CC" />
          <Input text="Fornecedor*" placeholder="Nome do Fornecedor"/>
          <Input text="CNPJ*" placeholder="Número de CNPJ"/>
          <Input text="TOVS*" placeholder="Código TOVS"/>
          <InputPesquisa text="Nota Fiscal*" placeholder="N° Nota Fiscal"/>
        </div>
        <div className={Styles.organizaHorizontal}>
          <Select
            text="Recorrência de Ordem*"
            options={["Selecione uma opção", "Betim", "Sete Lagoas"]}
          />
          <Input type="date" text="Data de Vencimento" />
          <Input type="date" text="Data de Competência" />

          <Input text="Dados de Pagamento*" placeholder="PIX, TED ou BOLETO" />
          <Input text="Criticidade*" placeholder="PIX, TED ou BOLETO" />
        </div>
        <div className={Styles.organizaHorizontal}>
          <Select
            text="Quantidade de ordem a ser paga*"
            options={["Selecione uma opção", "Betim", "Sete Lagoas"]}
          />
          <Input text="Valor*" placeholder="Valor" />
          <Input text="Observação*" placeholder="Observação" />
        </div>
        <div className={Styles.organizaHorizontal}>
          <BotaoPequeno text="Adicionar" cor="Azul" />
          <BotaoPequeno text="Cancelar" cor="Vermelho" />
        </div>
      </form>
    </>
  );
};

export default CadastroOrdem;
