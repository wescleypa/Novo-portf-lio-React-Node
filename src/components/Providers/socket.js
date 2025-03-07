import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Inicializa o Socket.IO
    const newSocket = io('http://192.64.86.189:3000');

    // Evento de conexão
    newSocket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO!');
    });

    // Evento de erro
    newSocket.on('connect_error', (error) => {
      console.error('Erro ao conectar ao servidor:', error);
    });

    setSocket(newSocket);

    // Limpa a conexão ao desmontar o componente
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};