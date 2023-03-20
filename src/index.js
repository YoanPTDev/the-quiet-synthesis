import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App';
import './index.css';

const DEFAULT_SETTINGS = {
  gameStarted: false,
  adventureLogExpanded: false,
  notebookExpanded: false,
};

const SET_GAME_STARTED = 'SET_GAME_STARTED';

const rootReducer = (state = DEFAULT_SETTINGS, action) => {
  if (action.type === SET_GAME_STARTED) {
    return {
      ...state,
      gameStarted: action.gameStarted,
    };
  }

  return state;
};

const store = configureStore({
  reducer: rootReducer,
});
store.subscribe(() => {
  console.log('store.getState()', store.getState());
});

const action = { type: SET_GAME_STARTED, gameStarted: true };

store.dispatch(action);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
