import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { SocketProvider } from './middleware/socketcontext';
import { socketMiddleware } from './middleware/socketMiddleware';
import rootReducer from './reducers';
import App from './components/App';
// import './paper.css';
import './index.css';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }).concat(socketMiddleware),
});

store.subscribe(() => {
  console.log('STORE ->', store.getState());
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SocketProvider>
      <App />
    </SocketProvider>
  </Provider>
);
