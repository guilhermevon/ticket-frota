import React, { createContext } from "react";

// Criando um contexto
export const PortContext = createContext();

// Criar um provedor de contexto
export const PortProvider = ({ children }) => {
  const dadoPorta = "9209"; //9209 = teste       9210 = produção

  return (
    <PortContext.Provider value={dadoPorta}>{children}</PortContext.Provider>
  );
};
