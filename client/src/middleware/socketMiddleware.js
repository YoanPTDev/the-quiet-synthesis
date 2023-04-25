// import { fetchLog } from "../actions/log";

// let socketInstance;

// export const setSocketInstance = (socket) => {
//   socketInstance = socket;
// };

// export const socketMiddleware = () => {
//   return (store) => {
//     socketInstance.on('updatedLogs', (data) => {
//       store.dispatch(fetchLog(data));
//     });

//     return (next) => (action) => {
//       return next(action);
//     };
//   };
// };

import { fetchLog } from '../actions/log';
import { fetchNote } from '../actions/note';

let socketInstance;

export const setSocketInstance = (socket) => {
  socketInstance = socket;
  setupSocketListeners();
};

const setupSocketListeners = () => {
  if (socketInstance) {
    socketInstance.on('updatedLogs', (data) => {
      storeReference.dispatch(fetchLog(data));
    });
    socketInstance.on('updateNotebook', (data) => {
      storeReference.dispatch(fetchNote(data));
    });
  }
};

let storeReference;

export const socketMiddleware = () => {
  return (store) => {
    storeReference = store;
    setupSocketListeners();

    return (next) => (action) => {
      return next(action);
    };
  };
};
