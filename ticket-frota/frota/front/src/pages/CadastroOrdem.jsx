import React, { useState, useEffect, UserContext } from "react";
//import axios from "axios";
import Input from "../components/form/Input";
import InputPesquisa from "../components/form/InputPesquisa";
import Select from "../components/form/Select";
import Styles from "./Solicitacao.module.css";
import BotaoPequeno from "../components/form/BotaoPequeno";
import InputGrande from "../components/form/InputGrande";
import GridFrota from "../components/tabelas/GridFrota";

const CadastroOrdem = () => {
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [fornecedor, setFornecedor] = useState("");

  const [formData, setFormData] = useState({
    atividade_custo: null,
    empresa: null,
    departamento: null,
    numero_ordem: null,
    cc: null,
    fornecedor: null,
    cnpj: null,
    cod_tovs: null,
    nota_fiscal: null,
    recorrencia_ordem: null,
    data_vencimento: null,
    data_competencia: null,
    dados_pagamento: null,
    criticidade: null,
    ordem_paga: null,
    valor: null,
    obs: null,
  });

  const ordem = [
    { value: "mensal", label: "Mensal" },
    { value: "spot", label: "SPOT" },
  ];

  const dadosPagemento = [
    { value: "pix", label: "PIX" },
    { value: "ted", label: "TED" },
    { value: "boleto", label: "BOLETO" },
  ];

  const criticidade = [
    { value: "muito alta", label: "Muito Alta" },
    { value: "alta", label: "Alta" },
    { value: "media", label: "Média" },
    { value: "baixa", label: "Baixa" },
  ];

  const handleSubmit = async (e) => {
    const requestData = {
      atividade_custo: formData.atividade_custo,
      empresa: formData.empresa,
      departamento: formData.departamento,
      numero_ordem: formData.numero_ordem,
      cc: formData.cc,
      fornecedor: formData.fornecedor,
      cnpj: formData.cnpj,
      cod_tovs: formData.cod_tovs,
      nota_fiscal: formData.nota_fiscal,
      recorrencia_ordem: formData.recorrencia_ordem,
      data_vencimento: formData.data_vencimento,
      data_competencia: formData.data_competencia,
      dados_pagamento: formData.dados_pagamento,
      criticidade: formData.criticidade,
      ordem_paga: formData.ordem_paga,
      valor: formData.valor,
      obs: formData.obs,
    };
    e.preventDefault();

    if (
      formData.atividade_custo === null ||
      formData.atividade_custo === "" ||
      formData.empresa === null ||
      formData.empresa === "" ||
      formData.departamento === null ||
      formData.departamento === "" ||
      formData.numero_ordem === null ||
      formData.numero_ordem === "" ||
      formData.cc === null ||
      formData.cc === "" ||
      formData.fornecedor === null ||
      formData.fornecedor === "" ||
      formData.cnpj === null ||
      formData.cnpj === "" ||
      formData.cod_tovs === null ||
      formData.cod_tovs === "" ||
      formData.nota_fiscal === null ||
      formData.nota_fiscal === "" ||
      formData.recorrencia_ordem === null ||
      formData.recorrencia_ordem === "" ||
      formData.data_vencimento === null ||
      formData.data_vencimento === "" ||
      formData.dados_pagamento === null ||
      formData.dados_pagamento === "" ||
      formData.criticidade === null ||
      formData.criticidade === "" ||
      formData.valor === null ||
      formData.valor === "" ||
      formData.obs === null ||
      formData.obs === ""
    ) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }
  }


  return (
    <>
      <form className={Styles.container} /*onSubmit={handleSubmit}*/>
        <h1>Orçamento de Manutenção</h1>
        <div className={Styles.organizaHorizontal}>
          <Input
            text="Atividade/Descritivo Custo*"
            placeholder="Descrição de Custo"
          />
          <Input text="Empresa" placeholder="N° Laudo" />
          <Select
            text="Departamento"
            options={["Selecione uma opção", "Betim", "Sete Lagoas"]}
            placeholder="Nome do Departamento*"
          />
          <Input text="N°Ordem*" placeholder="N° Ordem Pagamento" />
        </div>
        <div className={Styles.organizaHorizontal}>
          <Input text="CC*" placeholder="N° CC" />
          <Input text="Fornecedor*" placeholder="Nome do Fornecedor" />
          <Input text="CNPJ*" placeholder="Número de CNPJ" />
          <Input text="TOVS*" placeholder="Código TOVS" />
          <InputPesquisa text="Nota Fiscal*" placeholder="N° Nota Fiscal" />
        </div>
        <div className={Styles.organizaHorizontal}>
          <Select text="Recorrência de Ordem*" options={ordem} />
          <Input type="date" text="Data de Vencimento" />
          <Input type="date" text="Data de Competência" />

          <Select text="Dados de Pagamento*" options={dadosPagemento} />
          <Select text="Criticidade*" options={criticidade} />
        </div>
        <div className={Styles.organizaHorizontal}>
          <Select
            text="Quantidade de ordem a ser paga*"
            options={["Selecione uma opção", "Betim", "Sete Lagoas"]}
          />
          <Input text="Valor*" placeholder="R$" />
          <InputGrande text="Observação*" placeholder="Observação" />
        </div>
        <div className={Styles.organizaHorizontal}>
          <BotaoPequeno text="Adicionar" cor="Azul" onClick={handleSubmit}/>
          <BotaoPequeno text="Cancelar" cor="Vermelho" />
        </div>
      </form>
    </>
  );
};

export default CadastroOrdem;