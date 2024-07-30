import React, { useState, useEffect, useRef } from "react";
import Input from "../components/form/Input";
import InputPesquisa from "../components/form/InputPesquisa";
import Select from "../components/form/Select";
import Styles from "./Solicitacao.module.css";
import BotaoPequeno from "../components/form/BotaoPequeno";
import BotaoAlterna from "../components/form/BotaoAlterna";
import axios from "axios";
import Modal from "../components/modais/modalFotoDefeito"
//import PortContext from "../context/PortContext";

const Solicitacao = () => {
  const videoRef = useRef(null);
  const [capturarImagem, setCapturarImagem] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  //const [modalStepper, setModalStepper] = useState(false);
  //const port = PortContext();
  const [modalOpen, setOpenModal] = useState(false);

  const bases = [
    { value: "Betim", label: "Betim" },
    { value: "Sete Lagoas", label: "Sete Lagoas" },
  ];

  const [formData, setFormData] = useState({
    placa_veiculo: null,
    quilometragem: null,
    defeito: null,
    veiculo_parado: null,
    matricula_solicitanete: null,
    nome_solicitante: null,
    data_solicitacao: null,
    base: null,
    //registro_foto: capturarImagem,
    tipo_solicitacao: null,
    tipo_veiculo: null,
  });

  /*const startVideo = async () => {
    setVideoEnabled(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    }
  };

  /*const capturarFoto = async () => {
    if (!videoRef.current) {
      console.error("O elemento de vídeo não está definido.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (blob) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const imageDataURL = reader.result;
          setCapturarImagem(imageDataURL);
        };
        reader.readAsDataURL(blob);
      } else {
        console.error("Failed to capture photo as blob.");
      }
    }, "image/jpeg");
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setVideoEnabled(false);
    }
  };

  useEffect(() => {
    return () => {
      stopVideo();
    };
  }, []);*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      base: selectedOption.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(true);
    const requestData = {
      placa_veiculo: formData.placa_veiculo,
      quilometragem: formData.quilometragem,
      defeito: formData.defeito,
      veiculo_parado: formData.veiculo_parado,
      matricula_solicitanete: formData.matricula_solicitanete,
      nome_solicitante: formData.nome_solicitante,
      data_solicitacao: formData.data_solicitacao,
      base: formData.base,
      //registro_foto: formData.registro_foto,
      tipo_solicitacao: formData.tipo_solicitacao,
      tipo_veiculo: formData.tipo_veiculo,
    };

    e.preventDefault();

    if (
      formData.placa_veiculo === null ||
      formData.placa_veiculo === "" ||
      formData.quilometragem === null ||
      formData.quilometragem === "" ||
      formData.defeito === null ||
      formData.defeito === "" ||
      formData.veiculo_parado === null ||
      formData.veiculo_parado === "" ||
      formData.matricula_solicitanete === null ||
      formData.matricula_solicitanete === "" ||
      formData.nome_solicitante === null ||
      formData.nome_solicitante === "" ||
      formData.data_solicitacao === null ||
      formData.data_solicitacao === "" ||
      formData.base === null ||
      formData.base === "" ||
      //formData.registro_foto === null ||
      //formData.registro_foto === "" ||
      formData.tipo_solicitacao === null ||
      formData.tipo_solicitacao === "" ||
      formData.tipo_veiculo === null ||
      formData.tipo_veiculo === ""
    );
    {
      //alert("Preencha todos os campos");
      // return;
    }

    if (requestData) {
      try {
        // Enviar a requisição HTTP POST para a rota do servidor
        const response = await axios.post(
          `http://192.168.0.232:${port}/solicitacao/create`,
          requestData
        );

        if (response.data) {
          alert("Requisição criada com sucesso!");
          navigate("/HomeSupervisor");
        } else {
          alert("Erro ao criar requisição!");
        }
      } catch (error) {
        console.error("Erro ao enviar a requisição:", error);
      }
    } else {
      console.log("Erro carregando o usuario");
      alert("Algo deu errado, recarregue a página");
    }
    console.log("Form Data:", formData);
    //startVideo();
    //abrirModalStepper();*/
  };

  return (
    <>
      <form className={Styles.container} onSubmit={handleSubmit}>
        <div>
          <div>
            <h1>Solicitação de Manutenção de Veículo</h1>
          </div>
          <div className={Styles.organizaHorizontal}>
            <InputPesquisa
              text="Placa do Veiculo*"
              name="placa_veiculo"
              placeholder="N° da Placa"
              onChange={handleChange}
            />
            <Input
              text="Tipo do Veiculo*"
              name="tipo_veiculo"
              placeholder="Tipo do Veículo"
              onChange={handleChange}
            />
            <Select
              text="Base*"
              name="base"
              options={bases}
              onChange={handleChange}
            />
            <Input
              text="N° Ordem*"
              name="numero_ordem"
              placeholder="N° Ordem Solicitação"
              onChange={handleChange}
            />
          </div>
          <div className={Styles.organizaHorizontal}>
            <Input
              text="KM do veículo*"
              name="quilometragem"
              placeholder="N° KM"
              onChange={handleChange}
            />
            <Input
              text="Defeito Macro*"
              name="defeito"
              placeholder="Localização do Defeito"
              onChange={handleChange}
            />
            <BotaoAlterna
              options={["Sim", "Não"]}
              name="veiculo_parado"
              text="Veículo parado?*"
              posicao="Horizontal"
              onChange={handleChange}
            />
            <InputPesquisa
              text="Matricula do Solicitante*"
              placeholder="Matricula"
              name="matricula_solicitanete"
              onChange={handleChange}
            />
          </div>
          <div className={Styles.organizaHorizontal}>
            <Input
              text="Nome do Solicitante*"
              placeholder="Nome"
              name="nome_solicitante"
              onChange={handleChange}
            />
            <Input
              type="date"
              text="Data da Solicitação*"
              name="data_solicitacao"
              placeholder={"dd/mm/aaaa"}
              onChange={handleChange}
            />
            <BotaoAlterna
              options={["Preventivo", "Corretivo"]}
              text="Tipo de Solicitação*"
              name="tipo_solicitacao"
              placeholder="Preventivo/Correntivo"
              posicao="Horizontal"
              onChange={handleChange}
            />
          </div>
          <div className={Styles.buttonInline}>
            <BotaoPequeno text="Adicionar" cor="Azul" type="submit" />
            <BotaoPequeno text="Cancelar" cor="Vermelho" />
            {/*<BotaoPequeno
              cor="Azul"
              name="registro_foto"
              text="Tirar Foto"
              onClick={(e) => {
                e.preventDefault();
                capturarFoto();
                setCapturarImagem(null);
                stopVideo();
              }}
              onChange={handleChange}
            />*/}
          </div>
          <Modal isOpen={modalOpen} onClose={() => setOpenModal(false)} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/*<video
            ref={videoRef}
            width="660"
            height="430"
            autoPlay
            playsInline
            style={{
              display: videoEnabled ? "block" : "none",
              marginTop: "10px",
            }}
          />*/}
        </div>
      </form>

      {/*capturarImagem && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={capturarImagem} alt="Foto do Colaborador" />
        </div>
      )*/}
    </>
  );
};

export default Solicitacao;
