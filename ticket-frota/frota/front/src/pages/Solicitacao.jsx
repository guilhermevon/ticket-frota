import React, { useState, useEffect, useRef } from "react";
import Input from "../components/form/Input";
import InputPesquisa from "../components/form/InputPesquisa";
import Select from "../components/form/Select";
import Styles from "./Solicitacao.module.css";
import BotaoPequeno from "../components/form/BotaoPequeno";
import BotaoAlterna from "../components/form/BotaoAlterna";

const Solicitacao = () => {
  const videoRef = useRef(null);
  const [capturarImagem, setCapturarImagem] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [modalStepper, setModalStepper] = useState(false);

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
    funcao: null,
    data_solicitacao: null,
    base: null,
    registro_foto: capturarImagem,
  });

  const startVideo = async () => {
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

  const capturarFoto = async () => {
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
  }, []);

  const fecharModalStepper = () => {
    setModalStepper(false);
  };

  const abrirModalStepper = () => {
    setModalStepper(true);
  };

  const handleSubmit = (e) => {
    const requestData = {
      placa_veiculo: formData.placa_veiculo,
      quilometragem: formData.quilometragem,
      defeito: formData.defeito,
      veiculo_parado: formData.veiculo_parado,
      matricula_solicitanete: formData.matricula_solicitanete,
      nome_solicitante: formData.nome_solicitante,
      funcao: formData.funcao,
      data_solicitacao: formData.data_solicitacao,
      base: formData.base,
      registro_foto: formData.registro_foto,
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
      formData.funcao === null ||
      formData.funcao === "" ||
      formData.data_solicitacao === null ||
      formData.data_solicitacao === "" ||
      formData.base === null ||
      formData.base === "" ||
      formData.registro_foto === null ||
      formData.registro_foto === ""
    );
    {
      alert("Preencha todos os campos");
      return;
    }

    startVideo();

    abrirModalStepper();
  };

  return (
    <>
      <form className={Styles.container} onSubmit={handleSubmit}>
        <div>
          <div>
            <h1>Solicitação de Manutenção de Veículo</h1>
          </div>
          <div className={Styles.organizaHorizontal}>
            <InputPesquisa text="Placa do Veiculo*" placeholder="N° da Placa" />
            <Input text="Tipo do Veiculo*" placeholder="Tipo do Veículo" />
            <Select text="Base*" options={bases} />
            <Input text="N° Ordem*" placeholder="N° Ordem Solicitação" />
          </div>
          <div className={Styles.organizaHorizontal}>
            <Input text="KM do veículo*" placeholder="N° KM" />
            <Input text="Defeito Macro*" placeholder="Localização do Defeito" />
            <BotaoAlterna
              options={["Sim", "Não"]}
              name="veiculo_parado"
              text="Veículo parado?*"
              posicao="Horizontal"
            />
            <InputPesquisa
              text="Matricula do Solicitante*"
              placeholder="Matricula"
            />
          </div>
          <div className={Styles.organizaHorizontal}>
            <Input text="Nome do Solicitante*" placeholder="Nome" />
            <Input
              type="date"
              text="Data da Solicitação*"
              name="data_retirada"
              placeholder={"dd/mm/aaaa"}
            />
            <BotaoAlterna
              options={["Preventivo", "Corretivo"]}
              text="Tipo de Solicitação*"
              placeholder="Preventivo/Correntivo"
              posicao="Horizontal"
            />
            <BotaoAlterna
              options={["Preventivo", "Corretivo"]}
              text="Tipo de Solicitação*"
              placeholder="Preventivo/Correntivo"
              posicao="Horizontal"
            />
          </div>
          <div className={Styles.organizaHorizontal}>
            <BotaoPequeno text="Cancelar" cor="Vermelho" />
            <BotaoPequeno
              cor="Azul"
              text="Tirar Foto"
              onClick={(e) => {
                e.preventDefault();
                capturarFoto();
                setCapturarImagem(null);
                stopVideo();
              }}
            />
            <BotaoPequeno text="Adicionar" cor="Azul" type="submit" />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <video
            ref={videoRef}
            width="660"
            height="430"
            autoPlay
            playsInline
            style={{
              display: videoEnabled ? "block" : "none",
              marginTop: "10px",
            }}
          />
        </div>
      </form>

      {capturarImagem && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={capturarImagem} alt="Foto do Colaborador" />
        </div>
      )}
    </>
  );
};

export default Solicitacao;
