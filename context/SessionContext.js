import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);

  // Carrega sessões do AsyncStorage quando o app inicia
  useEffect(() => {
    const loadSessions = async () => {
      const storedSessions = await AsyncStorage.getItem('sessions');
      if (storedSessions) {
        setSessions(JSON.parse(storedSessions));
      }
    };
    loadSessions();
  }, []);

  // Salva sessões no AsyncStorage sempre que mudar
  useEffect(() => {
    AsyncStorage.setItem('sessions', JSON.stringify(sessions));
  }, [sessions]);

  return (
    <SessionContext.Provider value={{ sessions, setSessions }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessions = () => useContext(SessionContext);
