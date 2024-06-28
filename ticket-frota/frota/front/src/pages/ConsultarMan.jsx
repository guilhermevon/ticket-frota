import React, { useState, useEffect, UserContext } from "react";
import GridFrota from "../components/tabelas/GridFrota";
import Input from "../components/form/Input";
import Styles from "../pages/Solicitacao.module.css";
import Select from "../components/form/Select";

const ConsultarMan = () => {
  //const [filters, setFilters] = useState([]); //estado para armazenar os filtros da tabela de manutenções
  const bases = [
    { value: "Betim", label: "Betim" },
    { value: "Sete Lagoas", label: "Sete Lagoas" },
  ];

  const criticidade = [
    { value: "muito alta", label: "Muito Alta" },
    { value: "alta", label: "Alta" },
    { value: "media", label: "Média" },
    { value: "baixa", label: "Baixa" },
  ];

  const tipoSolicitacao = [
    { value: "Preventivo", label: "Preventivo" },
    { value: "Corretivo", label: "Corretivo" },
  ];

  const etapa = [
    { value: "Solicitado", label: "Solicitado" },
    { value: "Aguardando Orçamento", label: "Aguardando Orçamento" },
    { value: "Aguardando Aprovação", label: "Aguardando Aprovação" },
    { value: "Em Execução", label: "Em Execução" },
    { value: "Executado", label: "Executado" },
  ];

  return (
    <>
      <form className={Styles.container}>
        <h1>Manutenções Pendentes</h1>
        <div className={Styles.organizaHorizontal}>
          <Select text="Base" placeholder="Base" options={bases} />
          <Input text="Setor*" placeholder="Setor" />
          <Select
            text="Criticidade*"
            placeholder="Criticidade"
            options={criticidade}
          />
          <Select
            text="Tipo de Solicitação*"
            placeholder="Tipo de Solicitação"
            options={tipoSolicitacao}
          />
          <Input type="date" text="Data Solicitação" />
          <Input type="date" text="Data Entrega" />
          <Select text="Etapa" placeholder="Etapa" options={etapa} />
        </div>
        <GridFrota />
      </form>
    </>
  );
};

export default ConsultarMan;
