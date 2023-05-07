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

import {
  ENABLE_DRAWING,
  END_DRAWING,
  END_TURN,
  SAVE_ACTION_DATA,
  START_TURN,
  UPDATE_ACTION,
  UPDATE_DISCUSSION,
  UPDATE_LOGS,
  SUBMIT_ACTION,
  START_PROJECT,
  DRAWN_CARD_DATA,
  SELECTED_PROMPT,
  DISCUSS,
  DESCRIPTION,
} from '../../utils/constants.mjs';

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
    this.scarc_abund = { scarcities: [], abundances: [] };
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

  gamePrep() {
    this.players.forEach((player) => {
      player.socket.emit(ENABLE_DRAWING);
      player.socket.on(END_DRAWING);
    });

    this.players.forEach((player) => {
      //WIP
      /*Voir si on utilise le meme systeme que les scarcities avec un different socket event
      ou un autre component avec socket acknowledgement*/
    });
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
  currentPrompt: null,
  listenersSetUp: false,

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
            this.gameEngine.map.projects.forEach((project) => {
              project.turns -= 1;

              if (project.turns == 0) {
                //Gerer la fin d'un projet
              }
            });
          }

          this.newWeek = Week.build(
            this.gameEngine.log.weeks.logs.length + 1,
            this.currentPlayer.socket.playerName,
            '',
            ''
          ); //Reset newWeek
          this.currentPrompt = null; //Reset prompt à chaque tour
          this.newAction1 = {};
          this.newAction2 = {};

          this.currentPlayer.socket.emit(START_TURN);
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
        } else {
          throw new Error(
            'Invalid state transition: ' + this.currentState + ' to ' + newState
          );
        }
        break;
      case playerStates.ACTION2:
        if (this.currentState === playerStates.ACTION1) {
          this.currentState = playerStates.ACTION2;
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
            UPDATE_LOGS,
            this.gameEngine.log.weeks
          );

          this.currentPlayer.socket.emit(END_TURN);
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

    // Set up the event listeners only once, when the turn starts
    if (!this.listenersSetUp) {
      this.currentPlayer.socket.on(SAVE_ACTION_DATA, (data) => {
        if (this.currentState === playerStates.ACTION1) {
          this.weekBuilder(data, this.newAction1);
          this.currentPlayer.socket.emit(UPDATE_ACTION, {
            //Changer pour broadcast apres tests
            action: this.newAction1,
            prompt: this.currentPrompt,
          });
        } else if (this.currentState === playerStates.ACTION2) {
          this.weekBuilder(data, this.newAction2);
          this.currentPlayer.socket.broadcast.emit(UPDATE_ACTION, {
            action: this.newAction2,
            prompt: this.currentPrompt,
          });
        }
      });

      this.currentPlayer.socket.on(SUBMIT_ACTION, () => {
        let action =
          this.currentState === playerStates.ACTION1
            ? this.newAction1
            : this.newAction2;

        if (action.type === START_PROJECT) {
          this.gameEngine.map.projects.push(
            new Project(action.turns, action.description)
          );
        }

        this.newWeek.actions.push(action);

        if (this.currentState === playerStates.ACTION1) {
          this.transition(playerStates.ACTION2);
        }
      });

      this.listenersSetUp = true;
    }
  },

  endTurn(gameEngine) {
    this.setGameEngine(gameEngine);
    //--------- Testing purposes, remove after ---------------
    if (this.isAction1) {
      this.currentState = playerStates.ACTION2;
    }
    //--------------------------------------------------------
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
      this.currentPlayer.socket.emit(DRAWN_CARD_DATA, JSON.stringify(card));
    } else {
      this.currentPlayer.socket.emit('error', { message: 'No cards left.' });
    }
  },

  async discuss(action) {
    const currPlayerIdx = this.gameEngine.currentPlayerIndex;
    const len = this.gameEngine.players.length;
    const discussion = [];
    const regex = /\?$/;

    let isQuestion = false;
    let firstPlayerAskedQuestion = false;

    for (
      let i = currPlayerIdx, count = 0;
      i < currPlayerIdx + len || isQuestion;
      i++, count++
    ) {
      const respondingPlayer = i % len;

      new Promise((resolve) => {
        this.gameEngine.players[respondingPlayer].socket.emit(
          DISCUSS,
          (response) => {
            resolve(response);
          }
        );
      }).then((reply) => {
        discussion.push({
          player: this.gameEngine.players[respondingPlayer].socket.playerName,
          reply: reply,
        });
      });
      Object.assign(action.discussion, discussion);
      io.emit(UPDATE_DISCUSSION, discussion);

      if (count === 0) {
        // First player's turn
        if (regex.test(reply)) {
          firstPlayerAskedQuestion = true;
        }
      } else if (respondingPlayer === currPlayerIdx) {
        if (firstPlayerAskedQuestion) {
          break; // If the first player asked a question and it's their turn again, end the discussion
        } else {
          isQuestion = false; // Ensure the discussion ends after the last player has made a statement
        }
      }
    }
  },

  // discuss(action) {
  //   const currPlayerIdx = this.gameEngine.currentPlayerIndex;
  //   const len = this.gameEngine.players.length;
  //   const discussion = [];
  //   const regex = /\?$/;

  //   let isQuestion = false;
  //   for (let i = currPlayerIdx; i < currPlayerIdx + len || isQuestion; i++) {
  //     let reply = '';
  //     const respondingPlayer = i % len;

  //     this.gameEngine.players[respondingPlayer].socket.emit(
  //       DISCUSS,
  //       (response) => {
  //         reply = response;
  //       }
  //     );

  //     discussion.push({
  //       player: this.gameEngine.players[respondingPlayer].socket.playerName,
  //       reply: reply,
  //     });
  //     Object.assign(action.discussion, discussion);
  //     io.emit(UPDATE_DISCUSSION, discussion);

  //     if (respondingPlayer === currPlayerIdx) {
  //       if (regex.test(reply)) {
  //         isQuestion = true;
  //       } else {
  //         break;
  //       }
  //     }
  //   }
  // },

  weekBuilder(data, action) {
    switch (data.type) {
      case DESCRIPTION:
        if (action != null) {
          console.log('DESCRIPTION', action.description);
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
      case SELECTED_PROMPT:
        this.currentPrompt =
          this.gameEngine.deck.currentCard.prompts[data.value].description;
        this.newWeek.promptChosen = this.currentPrompt;
        switch (this.gameEngine.deck.currentCard.prompts[data.value].mechanic) {
          case 'start project': // enable map for current player
            Object.assign(action, ProjectAction.build('', 0, 0));
            this.currentPlayer.socket.emit(ENABLE_DRAWING);
            break;
          case 'discovery': // enable map for current player
            Object.assign(action, DiscoverAction.build('', 0));
            this.currentPlayer.socket.emit(ENABLE_DRAWING);
            break;
          case 'discussion':
            Object.assign(action, DiscussAction.build('', 0));
            this.discuss(action);
            break;
          case 'prolong project':
            Object.assign(action, AddWeeksAction.build('', 0));
            break;
          case 'modify project': // enable map for current player
            Object.assign(action, ModifyAction.build('', 0));
            this.currentPlayer.socket.emit(ENABLE_DRAWING);
            break;
          case 'remove POI':
            Object.assign(action, RemoveMapElementAction.build('', 0));
            break;
          case 'lore': // enable map for current player
            Object.assign(action, AddLoreAction.build('', 0));
            this.currentPlayer.socket.emit(ENABLE_DRAWING);
            break;
          case 'complete project': // enable map for current player
            Object.assign(action, CompleteProjectAction.build('', 0));
            this.currentPlayer.socket.emit(ENABLE_DRAWING);
            break;
          case 'pause projects':
            Object.assign(action, PauseProjectsAction.build('', 0));
            this.gameEngine.reduceTimers = false;
            break;
          case 'modify ressource':
            Object.assign(action, ModifyRessourcesAction.build('', 0));
            // Changer le futur scarcities-abundances object
            break;
          case 'end game':
            Object.assign(action, EndGameAction.build('', 0));
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
        console.log('Week Builder Unknown data type');
        break;
    }
  },
};

export default GameEngine;
