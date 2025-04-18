// context/PatientContext.js
import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
const PatientContext = createContext();

// Criar o provider para disponibilizar o estado
export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  return (
    <PatientContext.Provider value={{ patients, setPatients }}>
      {children}
    </PatientContext.Provider>
  );
};

// Hook para consumir o contexto
export const usePatients = () => {
  return useContext(PatientContext);
};
