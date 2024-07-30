import { useTable, usePagination } from "react-table";
import styles from "./GridFrota.module.css";
import React, { useEffect, useState } from "react";
import setaAzulDireita from "../../../imagens/setaAzulDireita@2x.svg";

const GridFrota = ({ dados, filters }) => {
  const [date, setDate] = useState([]);

  const colunas = React.useMemo(
    () => [
      { Header: "N° Ordem", accessor: "num_ordem" },
      { Header: "Base", accessor: "base" },
      { Header: "Setor", accessor: "setor" },
      { Header: "Criticidade", accessor: "criticidade" },
      { Header: "Tipo de Solicitacao", accessor: "tipo_solicitacao" },
      { Header: "Data Solicitação", accessor: "data_solicitação", Cell: ({ cell: { value } }) => formatDate(value),},
      { Header: "Data Entrega", accessor: "data_entrega", Cell: ({ cell: { value } }) => formatDate(value), },
      { Header: "Placa / Tipo de Veiculo", accessor: "placa_veiculo" },
      { Header: "Defeito", accessor: "defeito" },
      { Header: "Etapa", accessor: "etapa" },
      { Header: "Orçamento", accessor: "orcamento" },
    ],
    []
  );

  const formatDate = (data) => {
    return format(new Date(data), "dd/MM/yyyy"); //exibir data formatada
  };

  useEffect(() => {
    filtrarDados();
  }, [dados, filters]); // Adiciona dependências para useEffect

  const filtrarDados = () => {
    if (!dados) return;

    let dadosFiltrados = dados;

    if (filters) {
      if (filters.num_ordem) {
        dadosFiltrados = dadosFiltrados.filter(
          (item) =>
            item.num_ordem &&
            item.num_ordem.toString().includes(filters.num_ordem)
        );
      }
      if (filters.base) {
        dadosFiltrados = dadosFiltrados.filter(
          (item) => item.base && item.base.toString().includes(filters.base)
        );
      }
      if (filters.setor) {
        dadosFiltrados = dadosFiltrados.filter(
          (item) => item.setor && item.setor.toString().includes(filters.setor)
        );
      }
      if (filters.criticidade) {
        dadosFiltrados = dadosFiltrados.filter(
          (item) =>
            item.criticidade &&
            item.criticidade.toString().includes(filters.criticidade)
        );
      }
      if (filters.tipo_solicitacao) {
        dadosFiltrados = dadosFiltrados.filter(
          (item) =>
            item.tipo_solicitacao &&
            item.tipo_solicitacao.toString().includes(filters.tipo_solicitacao)
        );
      }
      if (filters.data_solicitacao) {
        dadosFiltrados = dadosFiltrados.filter(
          (item) =>
            item.data_solicitacao &&
            item.data_solicitacao.toString().includes(filters.data_solicitacao)
        );
      }
      if (filters.data_entrega) {
        dadosFiltrados = dadosFiltrados.filter(
          (item) =>
            item.data_entrega &&
            item.data_entrega.toString().includes(filters.data_entrega)
        );
      }
      if (filters.placa_veiculo) {
        dadosFiltrados = dadosFiltrados.filter(
          (item) =>
            item.placa_veiculo &&
            item.placa_veiculo.toString().includes(filters.placa_veiculo)
        );
      }
      if (filters.defeito) {
        dadosFiltrados = dadosFiltrados.filter(
          (item) =>
            item.defeito && item.defeito.toString().includes(filters.defeito)
        );
      }
      if (filters.etapa) {
        dadosFiltrados = dadosFiltrados.filter(
          (item) => item.etapa && item.etapa.toString().includes(filters.etapa)
        );
      }
      if (filters.orcamento) {
        dadosFiltrados = dadosFiltrados.filter(
          (item) =>
            item.orcamento &&
            item.orcamento.toString().includes(filters.orcamento)
        );
      }
    }

    setDate(dadosFiltrados);
  };

  const semDados = date ? date.length === 0 : true;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    gotoPage,
  } = useTable(
    {
      columns: colunas,
      data: date || [],
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  return (
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.grid}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={`${styles.cabecalho} ${styles["th-sticky"]}`}
            >
              {headerGroup.headers.map((coluna) => (
                <th
                  {...coluna.getHeaderProps()}
                  style={{ paddingLeft: "15px", paddingRight: "15px" }}
                >
                  {coluna.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {!semDados ? (
            page.map((linha) => {
              prepareRow(linha);
              return (
                <tr {...linha.getRowProps()} className={styles.celula}>
                  {linha.cells.map((c) => (
                    <td {...c.getCellProps()}>{c.render("Cell")}</td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr className={styles.celula}>
              <td colSpan={colunas.length}>Nenhum dado disponível</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Paginação */}
      <div className={styles.pagination}>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <span>
          Página{" "}
          <input
            className={styles.pageInput}
            type="number"
            min="1"
            max={pageOptions.length}
            value={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }
            }}
            style={{ width: "50px", textAlign: "center" }}
          />{" "}
          de {pageOptions.length}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
      </div>
    </div>
  );
};

export default GridFrota;
