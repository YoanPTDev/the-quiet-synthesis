import Game from "./game.js";
import Notebook from "./notebook.js";
import { Deck } from "./deck.js";
import Map from "./map.js";
import AdventureLog from "./adventure_log.js";
import Week from "./week.js";
import Project from "./project.js";
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
} from "./game_action_strategy.js";

import {
  ENABLE_DRAWING,
  END_DRAWING,
  END_TURN,
  SAVE_ACTION_DATA,
  START_TURN,
  UPDATE_ACTION,
  UPDATE_DISCUSSION,
  UPDATE_LOGS,
  START_PROJECT,
  DRAWN_CARD_DATA,
  SELECTED_PROMPT,
  DISCUSS,
  DESCRIPTION_DATA,
  DISCUSSION_DATA,
  SECOND_TURN_ACTION
} from "../../utils/constants.mjs";

import io from "../server.js";
import { EventEmitter } from "events";

class EndDiscussionEmitter extends EventEmitter {}

const playerStates = {
  WAITING: "WAITING",
  DRAW: "DRAW",
  ACTION1: "ACTION1",
  ACTION2: "ACTION2",
  FINISHED: "FINISHED",
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
  discussionListener: new EndDiscussionEmitter(),

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
            "",
            ""
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
            "Invalid state transition: " + this.currentState + " to " + newState
          );
        }
        break;
      case playerStates.ACTION1:
        if (this.currentState === playerStates.DRAW) {
          this.currentState = playerStates.ACTION1;

          console.log(`${this.currentPlayer.socket.playerName} ACTION 1`);
        } else {
          throw new Error(
            "Invalid state transition: " + this.currentState + " to " + newState
          );
        }
        break;
      case playerStates.ACTION2:
        if (this.currentState === playerStates.ACTION1) {
          this.currentState = playerStates.ACTION2;

          console.log(`${this.currentPlayer.socket.playerName} ACTION 2`);
          this.currentPlayer.socket.emit('SECOND_TURN_ACTION');
        } else {
          throw new Error(
            "Invalid state transition: " + this.currentState + " to " + newState
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
            "Invalid state transition: " + this.currentState + " to " + newState
          );
        }
        break;
      default:
        throw new Error("Invalid state: " + newState);
    }
  },

  startTurn(gameEngine, player) {
    this.setGameEngine(gameEngine);
    this.currentPlayer = player;
    this.transition(playerStates.DRAW);

    // Set up the event listeners only once, when the turn starts
    this.currentPlayer.socket.once(SAVE_ACTION_DATA, (data) => {
      this.handleSaveData(data);
    });

    if (!this.listenersSetUp) {
      this.discussionListener.on("discussionEnd", () => {
        if (this.currentState === playerStates.ACTION1) {
          if (Object.keys(this.newAction1).length !== 0) {
            if (this.newAction1.isCompleted()) {
              this.consolidateAction();
            }
          }
        } else if (this.currentState === playerStates.ACTION2) {
          if (Object.keys(this.newAction2).length !== 0) {
            if (this.newAction1.isCompleted()) {
              this.consolidateAction();
            }
          }
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
      this.currentPlayer.socket.emit(DRAWN_CARD_DATA, card);
    } else {
      this.currentPlayer.socket.emit("error", { message: "No cards left." });
    }
  },

  handleSaveData(data) {
    if (this.currentState === playerStates.ACTION1) {
      this.weekBuilder(data, "newAction1");
      this.currentPlayer.socket.emit(UPDATE_ACTION, {
        //Changer pour broadcast apres tests
        action: this.newAction1,
        prompt: this.currentPrompt,
      });

      if (Object.keys(this.newAction1).length !== 0) {
        if (this.newAction1.isCompleted()) {
          this.consolidateAction();
        }
      }
    } else if (this.currentState === playerStates.ACTION2) {
      this.weekBuilder(data, "newAction2");
      this.currentPlayer.socket.broadcast.emit(UPDATE_ACTION, {
        action: this.newAction2,
        prompt: this.currentPrompt,
      });

      if (Object.keys(this.newAction1).length !== 0) {
        if (this.newAction1.isCompleted()) {
          this.consolidateAction();
        }
      }
    }
  },

  consolidateAction() {
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
    } else if (this.currentState === playerStates.ACTION2) {
      this.endTurn();
    }
  },

  discuss(action) {
    const currPlayerIdx = this.gameEngine.currentPlayerIndex;
    const len = this.gameEngine.players.length;
    const discussion = [];
    const regex = /\?$/;

    let firstPlayerAskedQuestion = false;
    let count = 0;

    const handleDiscussionData = (data) => {
      const respondingPlayer = (currPlayerIdx + count) % len;
      const reply = {
        player: this.gameEngine.players[respondingPlayer].socket.playerName,
        statement: data,
      };

      discussion.push(reply);
      this[action].discussion = discussion;
      io.emit(UPDATE_DISCUSSION, discussion);

      if (count === 0) {
        // First player's turn
        firstPlayerAskedQuestion = regex.test(reply.statement);
        if (firstPlayerAskedQuestion) {
          this[action].expectedDiscussionLength += 1;
        }
      }

      if (
        count < len - 1 ||
        (firstPlayerAskedQuestion && respondingPlayer !== currPlayerIdx)
      ) {
        // Move to next player's turn
        count++;
        const nextPlayer = (currPlayerIdx + count) % len;
        this.gameEngine.players[nextPlayer].socket.emit(DISCUSS);
        this.gameEngine.players[nextPlayer].socket.once(
          DISCUSSION_DATA,
          handleDiscussionData
        );
      } else {
        this.discussionListener.emit("discussionEnd");
      }
    };

    // Start with the current player's turn
    this.currentPlayer.socket.emit(DISCUSS);
    this.currentPlayer.socket.once(
      DISCUSSION_DATA,
      handleDiscussionData
    );
  },

  weekBuilder(data, action) {
    console.log('weekBuilder');
    switch (data.type) {
      case DESCRIPTION_DATA:
        if (action != null) {
          console.log("DESCRIPTION", action.description);
          this[action].description = data.value;
        } else {
          console.log("Action does not exit");
        }
        break;
      case "NbTurns":
        if (action != null) {
          this[action].turns = data.value;
        } else {
          console.log("Action does not exit");
        }
        break;
      case SELECTED_PROMPT:
        this.currentPrompt =
          this.gameEngine.deck.currentCard.prompts[data.value].description;
        this.newWeek.promptChosen = this.currentPrompt;
        switch (this.gameEngine.deck.currentCard.prompts[data.value].mechanic) {
          case "start project": // enable map for current player
            this[action] = new ProjectAction("", 0, 0);
            this.currentPlayer.socket.emit(ENABLE_DRAWING);
            break;
          case "discovery": // enable map for current player
            this[action] = new DiscoverAction("", 0);
            this.currentPlayer.socket.emit(ENABLE_DRAWING);
            break;
          case "discussion":
            this[action] = new DiscussAction(
              "",
              0,
              this.gameEngine.players.length
            );
            this.discuss(action);
            break;
          case "prolong project":
            this[action] = new AddWeeksAction("", 0);
            break;
          case "modify project": // enable map for current player
            this[action] = new ModifyAction("", 0);
            this.currentPlayer.socket.emit(ENABLE_DRAWING);
            break;
          case "remove POI":
            this[action] = new RemoveMapElementAction("", 0);
            break;
          case "lore": // enable map for current player
            this[action] = new AddLoreAction("", 0);
            this.currentPlayer.socket.emit(ENABLE_DRAWING);
            break;
          case "complete project": // enable map for current player
            this[action] = new CompleteProjectAction("", 0);
            this.currentPlayer.socket.emit(ENABLE_DRAWING);
            break;
          case "pause projects":
            this[action] = new PauseProjectsAction("", 0);
            this.gameEngine.reduceTimers = false;
            break;
          case "modify ressource":
            this[action] = new ModifyRessourcesAction("", 0);
            // Changer le futur scarcities-abundances object
            break;
          case "end game":
            this[action] = new EndGameAction("", 0);
            break;
          case "end turn": //A tester, incertain
            this.transition(playerStates.ACTION2);
            this.gameEngine.endTurn();
            break;
          case "discard cards":
            this.gameEngine.deck.discard(2);
            break;
          default:
            console.log("Unknown Error");
            break;
        }
        break;
      default:
        console.log("Week Builder Unknown data type");
        break;
    }
  },
};

export default GameEngine;
