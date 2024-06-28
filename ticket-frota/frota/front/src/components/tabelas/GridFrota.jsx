import { useTable, usePagination } from "react-table";
import styles from "./GridFrota.module.css"; // Certifique-se de criar este arquivo CSS
import React, { useEffect, useState } from "react";
import setaAzulDireita from "../../../imagens/setaAzulDireita@2x.svg"; // Certifique-se de ter esta imagem ou substitua pelo caminho correto

const GridFrota = ({ dados }) => {
  const [date, setDate] = useState([]); // Estado para armazenar os dados da requisição

  // Cabeçalho da tabela
  const colunas = React.useMemo(
    () => [
      {
        Header: "N° Ordem",
        accessor: "numero_ordem", // Nome da propriedade de dados correspondente
      },
      {
        Header: "Base",
        accessor: "base",
      },
      {
        Header: "Setor",
        accessor: "setor",
      },
      {
        Header: "Criticidade",
        accessor: "criticidade",
      },
      {
        Header: "Tipo de Solicitacao",
        accessor: "tipo_solicitacao",
      },
      {
        Header: "Data Solicitação",
        accessor: "data_solicitação",
      },
      {
        Header: "Data Entrega",
        accessor: "data_entrega",
      },
      {
        Header: "Placa / Tipo de Veiculo",
        accessor: "placa_tipo_veiculo",
      },
      {
        Header: "Defeito",
        accessor: "defeito",
      },
      {
        Header: "Etapa",
        accessor: "etapa",
      },
      {
        Header: "Orçamento",
        accessor: "orcamento",
      },
    ],
    []
  );

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
    usePagination // Adiciona funcionalidade de paginação
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
              gotoPage(page); // Altere setPageIndex para gotoPage
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page); // Altere setPageIndex para gotoPage
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
