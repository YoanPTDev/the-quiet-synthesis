// middleware/socketContext.js
// "SocketProvider" est un composant React qui crée un contexte de 
// socket.io-client pour permettre la communication en temps réel entre le client 
// et le serveur, et le passe à tous les composants enfants via le Context API de React.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { setSocketInstance } from './socketMiddleware';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const newSocket = io.connect('http://localhost:3001');
    const newSocket = io.connect('http://thequietsynthesis.com:3001');
    setSocket(newSocket);
    setSocketInstance(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
