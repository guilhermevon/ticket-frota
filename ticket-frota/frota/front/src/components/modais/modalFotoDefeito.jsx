import React, {
  useState,
  useEffect,
  UserContext,
  useRef,
  forwardRef,
} from "react";
import Modal from "react-modal";
import BotaoPequeno from "../form/BotaoPequeno";
import Styles from "../modais/modalFotoDefeito.module.css"
Modal.setAppElement("#root");

const modalFotoDefeito = forwardRef(({ isOpen, onRequestClose, onConfirm }) => {
  const videoRef = useRef(null);
  //const [modal, setModal] = useState(false);
  //const [fotoDefeito, setFotoDefeito] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [capturarImagem, setCapturarImagem] = useState(null);

  const startVideo = async () => {
    setVideoEnabled(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Erro ao acessar a webcam:", error);
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
          //onImageSelect([blob]);
          onComplete(true);
        };
        reader.readAsDataURL(blob);
      } else {
        console.error("Falha ao capturar a foto como blob.");
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

  const handleImageSelection = async (imagensSelecionadas) => {
    if (
      !Array.isArray(imagensSelecionadas) ||
      imagensSelecionadas.length === 0
    ) {
      console.error("Nenhuma imagem selecionada.");
      return;
    }

    try {
      const base64Strings = await Promise.all(
        imagensSelecionadas.map(async (imagem) => {
          if (!(imagem instanceof Blob)) {
            console.error(
              "O parâmetro imagemSelecionada não é um arquivo válido. BLOBBB"
            );
            return null;
          }
          return await convertToBase64(imagem);
        })
      );

      if (base64Strings.includes(null)) {
        console.error(
          "Algumas imagens não puderam ser convertidas para base64."
        );
        return;
      }
    } catch (error) {
      console.error("Erro ao converter imagens para base64:", error);
    }
  };

  return (
    <>
      <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={Styles.modal}
      />
      <div className={Styles.container}>
        <h1>Registro Fotográfico do Defeito</h1>
        <p>Tire uma foto do defeito:</p>
      </div>
      <div>
        <div className={Styles.organizaHorizontal}>
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
              stopVideo();
            }}
          />
        </div>

        {videoEnabled && (
          <video
            ref={videoRef}
            width="670"
            height="460"
            autoPlay
            playsInline
            style={{ display: "block", marginTop: "10px" }}
          />
        )}
      </div>
      <div className={Styles.imagePreview}>
        {capturarImagem && (
          <div style={{ textAlign: "center", margin: "20px" }}>
            <b>Foto Capturada do Material:</b>
            <img src={capturarImagem} alt="Foto do Colaborador" />
          </div>
        )}
      </div>
    </>
  );
});

export default modalFotoDefeito;
