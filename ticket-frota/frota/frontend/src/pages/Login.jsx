import React from "react";
import Styles from "./Login.module.css";
import Input from "../components/form/Input";
//import { useUser } from "../context/UserContext";
import BotaoPequeno from "../components/form/BotaoPequeno";

const Login = ({ onLogin }) => {
  //const user = useUser();

 /* const handleSubmit = async (e) => {
    e.preventDefault();
    const matricula = e.target.matricula.value;
    const senha = e.target.senha.value;
    //console.log("MAT", matricula);
    //console.log("senha", senha);

    try {
      // Autenticação usando o contexto de usuário
      const userData = await user.login(matricula, senha);
      // console.(loguserData);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Matrícula ou senha incorretos. Tente novamente.");
    }
  }; */

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.layout}>
          <div className={Styles.texto}>Bem vindo ao SGF PROVAC!</div>
          <form>
            <div className={Styles.inputs}>
              <label htmlFor="matricula" className={Styles.label}>
                Matricula
              </label>
              <Input type="text" name="matricula" placeholder="" />
            </div>
            <div className={Styles.inputs}>
              <label htmlFor="senha" className={Styles.label}>
                Senha
              </label>
              <Input type="password" name="senha" placeholder="" />
            </div>
            <BotaoPequeno cor="Azul" text="Entrar" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;