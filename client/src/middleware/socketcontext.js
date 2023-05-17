import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { setSocketInstance } from './socketMiddleware';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const serverURL =
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_PROD_SERVER_URL
        : process.env.REACT_APP_SERVER_URL;
    const newSocket = io.connect(serverURL);
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
