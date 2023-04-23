import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { setSocketInstance } from './socketMiddleware';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io.connect('http://localhost:3001');
    setSocket(newSocket);
    setSocketInstance(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

// import { createContext, useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import SocketInstanceContext from './SocketInstanceContext';

// export const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io.connect('http://localhost:3001');
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   return (
//     <SocketInstanceContext.Provider value={socket}>
//       <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//     </SocketInstanceContext.Provider>
//   );
// };
