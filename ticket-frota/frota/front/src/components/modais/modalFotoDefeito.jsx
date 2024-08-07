import React, { useState, useEffect, useRef } from "react";
import BotaoPequeno from "../form/BotaoPequeno";
import Styles from "../modais/modalFotoDefeito.module.css";

const ModalFotoDefeito = ({ isOpen, onClose }) => {
  const [capturarImagem, setCapturarImagem] = useState(null);
  const videoRef = useRef(null);
  const [videoEnabled, setVideoEnabled] = useState(false);

  const startVideo = async () => {
    setVideoEnabled(true);
    if (navigator.mediaDevices && navigator.mediaDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Erro ao acessar a câmera", error);
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
          stopVideo();
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

  if (!isOpen) return null;

  return (
    <div className={Styles.modalOverlay}>
      <div className={Styles.modalContent}>
        <form>
          <h2>
            <b>FOTO DO DEFEITO DO VEÍCULO</b>
          </h2>
          <p>
            Tire foto do defeito do veículo clicando em abrir câmera e após isso
            clicando em <br /> tirar foto e clique em adicionar para enviar a
            foto para os gestores da frota{" "}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <BotaoPequeno
              cor="Vermelho"
              text="Abrir Câmera"
              onClick={(e) => {
                e.preventDefault();
                startVideo();
                setCapturarImagem(null);
              }}
            />
            <BotaoPequeno
              cor="Azul"
              text="Tirar Foto"
              onClick={(e) => {
                e.preventDefault();
                capturarFoto();
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {videoEnabled && (
              <video
                ref={videoRef}
                width="560"
                height="470"
                autoPlay
                playsInline
                style={{ display: "block" }}
              />
            )}
            {capturarImagem && (
              <div>
                <img
                  src={capturarImagem}
                  alt="Foto do Defeito"
                  style={{
                    textAlign: "center",
                    margin: "20px",
                    width: "305px",
                    height: "205px",
                  }}
                />
              </div>
            )}
          </div>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "21px" }}
          >
            <BotaoPequeno cor="Azul" text="Adicionar" />
            <BotaoPequeno
              cor="Vermelho"
              text="Cancelar"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFotoDefeito;
