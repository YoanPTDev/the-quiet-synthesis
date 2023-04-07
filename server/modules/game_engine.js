import Game from "./game.js";
import Notebook from "./notebook.js";
import { Deck } from "./deck.js";
import Map from "./map.js";
import AdventureLog from "./adventure_log.js";

const playerStates = {
  WAITING: 'WAITING',
  PLAYING: 'PLAYING',
  FINISHED: 'FINISHED',
};

class GameEngine {
  constructor(gameConfig, deckConfig, mapConfig) {
    this.game = new Game(gameConfig);
    this.notebook = new Notebook();
    this.deck = new Deck(deckConfig);
    this.players = new Array(); // Liste de Player
    this.map = new Map(mapConfig);
    this.log = new AdventureLog();
    this.gameId = 1; // ID de la partie (encore necessaire?)
    this.timeElapsed = 0; // Sert a calculer le temps passé pour la sauvegarde
    this.nbrContempts = 0; // Nombre de contempt tokens
    this.reduceTimers = false; // Determine si on reduit les projets durant le tour
    this.currentPlayerIndex = 0;
  }

  start() {
    playerTurnStateMachine.startTurn(this.currentPlayer());
  }

  endTurn() {
    playerTurnStateMachine.endTurn();
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
    playerTurnStateMachine.startTurn(this.currentPlayer());
  }

  currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
}

const playerTurnStateMachine = {
  currentPlayer: null,
  currentState: playerStates.WAITING,

  transition(newState) {
    switch (newState) {
      case playerStates.WAITING:
        this.currentState = playerStates.WAITING;
        break;
      case playerStates.PLAYING:
        if (this.currentState === playerStates.WAITING) {
          this.currentState = playerStates.PLAYING;
          io.to(this.currentPlayer.id).emit('start turn');
        } else {
          throw new Error(
            'Invalid state transition: ' + this.currentState + ' to ' + newState
          );
        }
        break;
      case playerStates.FINISHED:
        if (this.currentState === playerStates.PLAYING) {
          this.currentState = playerStates.FINISHED;
          io.to(this.currentPlayer.id).emit('end turn');
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

  startTurn(player) {
    this.currentPlayer = player;
    this.transition(playerStates.PLAYING);
  },

  endTurn() {
    this.transition(playerStates.FINISHED);
    this.currentPlayer = null;
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
};

export default GameEngine;