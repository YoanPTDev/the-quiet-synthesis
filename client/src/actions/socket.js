// actions/socket.js
// collection d'actions de Redux qui sont utilisés pour modifier l'état 
// en ce qui attrait à la connection et les messages du socket.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { SOCKET_CONNECTED, SEND_WEBSOCKET_MESSAGE } from "./types";

export const sendSocketMessage = (message) => {
  return {
    type: SEND_WEBSOCKET_MESSAGE,
    payload: message,
  };
}

export const socketConnected = (socket) => ({
  type: SOCKET_CONNECTED,
  socket,
});
