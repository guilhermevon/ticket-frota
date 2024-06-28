import React from "react";
import Styles from "./NavBar.module.css";
import Solicitacao from "../pages/Solicitacao";
import CadastroOrdem from "../pages/CadastroOrdem";
import GridFrota from "../components/tabelas/GridFrota";
import Login from "../pages/Login";
//import { Link } from "react-router-dom";

const NavBar = ({ nome, tipoUsuario }) => {
  //const user = useUser();
  // const handleLogout = () => {
  //    user.logout();
  //    // função onLogout quando o link "Sair" for clicado
  // };

  const option = [
    { value: "", label: "Selecione uma opção" },
    { value: "ordem de pagamento", label: "Ordem de Pagamento" },
    { value: "recebiveis", label: "Recebíveis" },
  ];

  const renderizaNavBarPeloTipoUsuario = () => {
    //console.log(`tipo nav ${tipoUsuario}`);

    return (
      <>
        <a href="#" className={Styles.opcoes}>
          Inicio
        </a>
        <a href="../pages/Solicitacao" className={Styles.opcoes}>
          Solicitação
        </a>
        <a to="/ConsultarRequisição" className={Styles.opcoes}>
          Revisão e Orçamento
        </a>
        <a to="/ConsultarRequisição" className={Styles.opcoes}>
          Aprovação
        </a>
        <a to="/ConsultarRequisição" className={Styles.opcoes}>
          Execução
        </a>
        <a
          href="../pages/CadastroOrdem"
          className={Styles.opcoes}
          options={option}
        >
          Cadastros
        </a>
      </>
    );
  };

  return (
    <>
      <nav className={Styles.navbar}>
        <div className={Styles.secaoUsuario}>
          {/*<img src="../imagens/User@2x.svg" alt="Usuário" />*/}
          <div className={Styles.infoUsuario}>
            <p className={Styles.nomeUsuario}>Bem-Vindo, Guilherme{/*nome*/}</p>
            <p className={Styles.profissao}>{tipoUsuario}</p>
          </div>
          {/* Renderiza as opções de navegação pelo tipo de usuário */}
        </div>
        <div className={Styles.opcoesMenu}>
          {renderizaNavBarPeloTipoUsuario()}
        </div>
        <div className={Styles.opcoesMenu}>
          <a to="/" className={Styles.opcoes}>
            Sair
          </a>
        </div>
      </nav>
      <Solicitacao />
    </>
  );
};

export default NavBar;
