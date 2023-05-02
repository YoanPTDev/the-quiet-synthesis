import Game from './game.js';
import Notebook from './notebook.js';
import { Deck } from './deck.js';
import Map from './map.js';
import AdventureLog from './adventure_log.js';
import Week from './week.js';
import Project from './project.js';
import {
  AddLoreAction,
  AddWeeksAction,
  CompleteProjectAction,
  DiscoverAction,
  DiscussAction,
  EndGameAction,
  ModifyAction,
  ModifyRessourcesAction,
  PauseProjectsAction,
  ProjectAction,
  RemoveMapElementAction,
} from './game_action_strategy.js';

import io from '../server.js';

const playerStates = {
  WAITING: 'WAITING',
  DRAW: 'DRAW',
  ACTION1: 'ACTION1',
  ACTION2: 'ACTION2',
  FINISHED: 'FINISHED',
};

class GameEngine {
  constructor(gameConfig, mapConfig) {
    this.game = new Game(gameConfig);
    this.notebook = new Notebook();
    this.deck = null;
    this.players = new Array(); // Liste de Player
    this.map = new Map(mapConfig);
    this.log = null;
    this.gameId = 1; // ID de la partie (encore necessaire?)
    this.timeElapsed = 0; // Sert a calculer le temps passé pour la sauvegarde
    this.nbrContempts = 0; // Nombre de contempt tokens
    this.reduceTimers = true; // Determine si on reduit les projets durant le tour
    this.currentPlayerIndex = 0;
    this.isGameRunning = false;
    this.scarc_abund = {scarcities: [], abundances: []};
  }

  async buildDeck(deckName) {
    this.deck = await Deck.build(deckName);
  }

  async buildAdventureLog(mapName, mapImage) {
    this.log = await AdventureLog.build(mapName, mapImage);
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
  newWeek: null,
  newAction1: null,
  newAction2: null,

  setGameEngine(gameEngine) {
    this.gameEngine = gameEngine;
  },

  transition(newState) {
    switch (newState) {
      case playerStates.WAITING:
        this.currentState = playerStates.WAITING;
        break;
      case playerStates.DRAW:
        if (this.currentState === playerStates.WAITING) {
          this.currentState = playerStates.DRAW;

          if (this.gameEngine.reduceTimers) {
            this.gameEngine.map.projects.forEach(project => {
              project.turns -= 1;

              if (project.turns = 0) {
                //Gerer la fin d'un projet
              }
            });
          }

          this.newWeek = Week.build(
            gameEngine.log.weeks.logs.length + 1,
            this.currentPlayer.socket.playerName,
            '',
            ''
          ); //Reset newWeek

          io.to(this.currentPlayer.socket.id).emit('start turn');
          console.log(`${this.currentPlayer.socket.playerName} start turn`);

          this.drawCard();
          this.newWeek.cardIdDrawn = this.gameEngine.deck.currentCard.id;

          this.transition(playerStates.ACTION1);
        } else {
          throw new Error(
            'Invalid state transition: ' + this.currentState + ' to ' + newState
          );
        }
        break;
      case playerStates.ACTION1:
        if (this.currentState === playerStates.DRAW) {
          this.currentState = playerStates.ACTION1;

          this.currentPlayer.socket.on('saveData', (data) => {
            this.weekBuilder(data, this.newAction1);
            this.currentPlayer.socket.broadcast.emit('updateWeek', this.newAction1)
          });

          this.currentPlayer.socket.on('submitAction', () => {
            if ((this.newAction1.type = 'StartProject')) {
              this.gameEngine.map.projects.push(
                new Project(this.newAction1.turns, this.newAction1.description)
              );
            }
            this.newWeek.actions.push(this.newAction1);
            this.transition(playerStates.ACTION2);
          });
        } else {
          throw new Error(
            'Invalid state transition: ' + this.currentState + ' to ' + newState
          );
        }
        break;
      case playerStates.ACTION2:
        if (this.currentState === playerStates.ACTION1) {
          this.currentState = playerStates.ACTION2;

          this.currentPlayer.socket.on('saveData', (data) => {
            this.weekBuilder(data, this.newAction2);
            this.currentPlayer.socket.broadcast.emit('updateWeek', this.newAction2)
          });

          this.currentPlayer.socket.on('submitAction', () => {
            if ((this.newAction2.type = 'StartProject')) {
              this.gameEngine.map.projects.push(
                new Project(this.newAction2.turns, this.newAction2.description)
              );
            }
            this.newWeek.actions.push(this.newAction2);
          });
        } else {
          throw new Error(
            'Invalid state transition: ' + this.currentState + ' to ' + newState
          );
        }
        break;
      case playerStates.FINISHED:
        if (this.currentState === playerStates.ACTION2) {
          this.currentState = playerStates.FINISHED;

          this.gameEngine.log.addEntry(this.newWeek);
          this.currentPlayer.socket.broadcast.emit(
            'updateLogs',
            this.gameEngine.log.weeks
          );

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
    this.transition(playerStates.DRAW);
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

  isDrawing() {
    return this.currentState === playerStates.DRAW;
  },

  isAction1() {
    return this.currentState === playerStates.ACTION1;
  },

  isAction2() {
    return this.currentState === playerStates.ACTION2;
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

  weekBuilder(data, action) {
    switch (data.type) {
      case 'ActionDesc':
        if (action != null) {
          action.description = data.value;
        } else {
          console.log('Action does not exit');
        }
        break;
      case 'NbTurns':
        if (action != null) {
          action.turns = data.value;
        } else {
          console.log('Action does not exit');
        }
        break;
      case 'ChosenPrompt':
        this.newWeek.promptChosen = data.value;
        switch (this.gameEngine.deck.currentCard.prompts[data.value].mechanic) {
          case 'start project':
            action = ProjectAction.build('', 0, 0);
            break;
          case 'discovery':
            action = DiscoverAction.build('', 0);
            break;
          case 'discussion':
            action = DiscussAction.build('', 0);
            break;
          case 'prolong project':
            action = AddWeeksAction.build('', 0);
            break;
          case 'modify project':
            action = ModifyAction.build('', 0);
            break;
          case 'remove POI':
            action = RemoveMapElementAction.build('', 0);
            break;
          case 'lore':
            action = AddLoreAction.build('', 0);
            break;
          case 'complete project':
            action = CompleteProjectAction.build('', 0);
            break;
          case 'pause projects':
            action = PauseProjectsAction.build('', 0);
            this.gameEngine.reduceTimers = false;
            break;
          case 'modify ressource':
            action = ModifyRessourcesAction.build('', 0);
            //Changer le futur scarcities-abundances object
            break;
          case 'end game':
            action = EndGameAction.build('', 0);
            break;
          case 'end turn': //A tester, incertain
            this.transition(playerStates.ACTION2);
            this.gameEngine.endTurn();
            break;
          case 'discard cards':
            this.gameEngine.deck.discard(2);
            break;
          default:
            console.log('Unknown Error');
            break;
        }
        break;
      default:
        console.log('Unknown data type');
        break;
    }
  },
};

export default GameEngine;
