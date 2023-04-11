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
