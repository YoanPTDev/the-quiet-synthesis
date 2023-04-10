import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/App';
import './index.css';

const store = configureStore({
  reducer: rootReducer,
});
store.subscribe(() => {
  console.log('store.getState()', store.getState());
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Le store est maintenant provided au component App
  // Chaque component doit être connecté individuellement au store
  <Provider store={store}>
    <App />
  </Provider>
);
