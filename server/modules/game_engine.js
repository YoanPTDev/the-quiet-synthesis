import Game from './game.js';
import Notebook from './notebook.js';
import { Deck } from './deck.js';
import Map from './map.js';
import AdventureLog from './adventure_log.js';

import io from '../server.js';

const playerStates = {
  WAITING: 'WAITING',
  PLAYING: 'PLAYING',
  FINISHED: 'FINISHED',
};

class GameEngine {
  constructor(gameConfig, mapConfig) {
    this.game = new Game(gameConfig);
    this.notebook = new Notebook();
    this.deck = null;
    this.players = new Array(); // Liste de Player
    this.map = new Map(mapConfig);
    this.log = new AdventureLog();
    this.gameId = 1; // ID de la partie (encore necessaire?)
    this.timeElapsed = 0; // Sert a calculer le temps passé pour la sauvegarde
    this.nbrContempts = 0; // Nombre de contempt tokens
    this.reduceTimers = false; // Determine si on reduit les projets durant le tour
    this.currentPlayerIndex = 0;
    this.isGameRunning = false;
  }

  async buildDeck(deckName) {
    this.deck = await Deck.build(deckName);
  }

  start() {
    if (!this.isGameRunning) {
      playerTurnStateMachine.startTurn(this, this.currentPlayer());
      this.isGameRunning = true;
    }
  }

  endTurn() {
    playerTurnStateMachine.endTurn(this);
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
    playerTurnStateMachine.startTurn(this, this.currentPlayer());
  }

  currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
}

//Concept de base fourni par ChatGPT
const playerTurnStateMachine = {
  currentPlayer: null,
  currentState: playerStates.WAITING,
  gameEngine: null,

  setGameEngine(gameEngine) {
    this.gameEngine = gameEngine;
  },

  transition(newState) {
    switch (newState) {
      case playerStates.WAITING:
        this.currentState = playerStates.WAITING;
        break;
      case playerStates.PLAYING:
        if (this.currentState === playerStates.WAITING) {
          this.currentState = playerStates.PLAYING;
          io.to(this.currentPlayer.socket.id).emit('start turn');
          console.log(`${this.currentPlayer.socket.playerName} start turn`);
          
          this.drawCard();
        } else {
          throw new Error(
            'Invalid state transition: ' + this.currentState + ' to ' + newState
          );
        }
        break;
      case playerStates.FINISHED:
        if (this.currentState === playerStates.PLAYING) {
          this.currentState = playerStates.FINISHED;
          io.to(this.currentPlayer.socket.id).emit('end turn');
          console.log(`${this.currentPlayer.socket.playerName} end turn`);
        } else {
          throw new Error(
            'Invalid state transition: ' + this.currentState + ' to ' + newState
          );
        }
        break;
      default:
        throw new Error('Invalid state: ' + newState);
    }
  },

  startTurn(gameEngine, player) {
    this.setGameEngine(gameEngine);
    this.currentPlayer = player;
    this.transition(playerStates.PLAYING);
  },

  endTurn(gameEngine) {
    this.setGameEngine(gameEngine);
    this.transition(playerStates.FINISHED);
    this.currentPlayer = null;
    this.transition(playerStates.WAITING);
  },

  isWaiting() {
    return this.currentState === playerStates.WAITING;
  },

  isPlaying() {
    return this.currentState === playerStates.PLAYING;
  },

  isFinished() {
    return this.currentState === playerStates.FINISHED;
  },

  drawCard() {
    let card = this.gameEngine.deck.drawCard();
    if (card != null) {
      this.currentPlayer.socket.emit('cardData', JSON.stringify(card));
      console.log(card);
    } else {
      this.currentPlayer.socket.emit('error', { message: 'No cards left.' });
    }
  },
};

export default GameEngine;
