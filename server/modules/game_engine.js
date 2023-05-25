import { Game } from "./game.js";
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
} from "./game_action_strategy.js";

import {
  ACTIONS,
  DATA,
  SECOND_ACTION,
  SECOND_TURN,
  UPDATE,
} from "../../utils/constants.mjs";

import io from "../server.js";
import { EventEmitter } from "events";

class EndDiscussionEmitter extends EventEmitter {}
class CompleteProjectPromptEmitter extends EventEmitter {}

const playerStates = {
  WAITING: "WAITING",
  DRAW: "DRAW",
  ACTION1: "ACTION1",
  PROJECTS: "PROJECTS",
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
    this.nbrContempts = 0; // Nombre de contempt tokens
    this.reduceTimers = true; // Determine si on reduit les projets durant le tour
    this.currentPlayerIndex = 0;
    this.isGameRunning = false;
    this.scarc_abund = { scarcities: [], abundances: [] };
    this.incompleteProjects = { incompleteProjects: [] };
  }

  getState() {
    const state = {
      gameStarted: this.isGameRunning,
      notebook: this.notebook.notes,
      advLog: this.log.weeks,
      scar_abund: this.scarc_abund,
      incompleteProjects: this.incompleteProjects,
    };
    return state;
  }

  async buildDeck(deckName) {
    this.deck = await Deck.build(deckName);
  }

  async buildAdventureLog(mapName, mapImage) {
    this.log = await AdventureLog.build(mapName, mapImage);
  }

  start() {
    if (!this.isGameRunning) {
      io.to(this.game.config.roomCode).emit(UPDATE.GAME_STARTED);
      playerTurnStateMachine.startTurn(this, this.currentPlayer());
      this.isGameRunning = true;
    }
  }

  endTurn() {
    playerTurnStateMachine.endTurn(this);
    do {
      this.currentPlayerIndex =
        (this.currentPlayerIndex + 1) % this.players.length;
    } while (!this.currentPlayer().isConnected);
    playerTurnStateMachine.startTurn(this, this.currentPlayer());
  }

  currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  gamePrep() {
    if (!this.isGameRunning) {
      let players = this.players;

      const emitDrawing = (index) => {
        // Skip over disconnected players
        while (index < players.length && !players[index].isConnected) {
          index++;
        }

        if (index >= players.length) {
          // All players have drawn, now add resources
          emitResource();
          return;
        }

        let player = players[index];
        player.socket.emit(UPDATE.ENABLE_DRAWING);

        player.socket.once(ACTIONS.END_DRAWING, () => {
          emitDrawing(index + 1);
        });
      };

      const emitResource = () => {
        io.to(this.game.config.roomCode).emit(ACTIONS.ADD_RESOURCES);
        players[0].socket.emit(UPDATE.FIRST_PLAYER_GAME_PREP);

        players[0].socket.once(ACTIONS.START_GAME, () => {
          this.start();
        });
      };

      // Start the drawing process
      emitDrawing(0);
    }
  }

  buildIncompleteProjectsArray() {
    let index = 0;
    this.incompleteProjects = { incompleteProjects: [] };

    this.map.projects.forEach((project) => {
      if (project.turns > 0) {
        this.incompleteProjects.incompleteProjects.push({
          index: index,
          playerName: project.player.name,
          desc: project.desc,
          turns: project.turns,
        });
      }
      index++;
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
  saveActionListener: null,
  discussionListener: new EndDiscussionEmitter(),
  completeProjectPromptListener: new CompleteProjectPromptEmitter(),

  saveActionHandler: function (data) {
    this.handleSaveData(data);
  },

  setGameEngine(gameEngine) {
    this.gameEngine = gameEngine;
  },

  transition(newState) {
    switch (newState) {
      case playerStates.WAITING:
        this.currentState = playerStates.WAITING;
        break;
      case playerStates.DRAW:
        if (this.isWaiting()) {
          this.currentState = playerStates.DRAW;

          //Création d'un listener qui sera retiré a la fin du tour afin d'éviter sa duplication.
          this.saveActionListener = this.saveActionHandler.bind(this);
          this.currentPlayer.socket.on(
            DATA.SAVE_ACTION,
            this.saveActionListener
          );

          this.newWeek = Week.build(
            this.gameEngine.log.weeks.logs.length + 1,
            this.currentPlayer.name,
            "",
            ""
          ); //Reset newWeek
          this.currentPrompt = null; //Reset prompt à chaque tour
          this.newAction1 = {};
          this.newAction2 = {};

          this.currentPlayer.socket.emit(ACTIONS.START_TURN);
          console.log(`${this.currentPlayer.name} start turn`);

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
        if (this.isDrawing()) {
          this.currentState = playerStates.ACTION1;

          console.log(`${this.currentPlayer.name} ACTION 1`);
        } else {
          throw new Error(
            "Invalid state transition: " + this.currentState + " to " + newState
          );
        }
        break;
      case playerStates.PROJECTS:
        if (this.isAction1()) {
          this.currentState = playerStates.PROJECTS;

          console.log(`PROJECTS`);

          if (this.gameEngine.reduceTimers) {
            this.gameEngine.log.weeks.logs.forEach((week) => {
              week.actions.forEach((action) => {
                if (action.turns > 0) {
                  action.turns -= 1;
                }
              });
            });
            this.newWeek.actions.forEach((action) => {
              if (action.turns > 0) {
                action.turns -= 1;
              }
            });

            this.processProjects(0);
            this.gameEngine.buildIncompleteProjectsArray();
          } else {
            this.gameEngine.reduceTimers = true;
          }

          io.to(this.gameEngine.game.config.roomCode).emit(
            DATA.INCOMPLETE_PROJECTS_LIST,
            this.gameEngine.incompleteProjects
          );

          this.transition(playerStates.ACTION2);
        } else {
          throw new Error(
            "Invalid state transition: " + this.currentState + " to " + newState
          );
        }
        break;
      case playerStates.ACTION2:
        if (this.isProjects()) {
          this.currentState = playerStates.ACTION2;

          console.log(`${this.currentPlayer.name} ACTION 2`);

          this.currentPlayer.socket.emit(SECOND_TURN.ACTION);
        } else {
          throw new Error(
            "Invalid state transition: " + this.currentState + " to " + newState
          );
        }
        break;
      case playerStates.FINISHED:
        if (this.isAction2()) {
          this.currentState = playerStates.FINISHED;

          this.gameEngine.buildIncompleteProjectsArray();
          io.to(this.gameEngine.game.config.roomCode).emit(
            DATA.INCOMPLETE_PROJECTS_LIST,
            this.gameEngine.incompleteProjects
          );

          this.gameEngine.log.addEntry(this.newWeek);
          io.to(this.gameEngine.game.config.roomCode).emit(
            UPDATE.LOGS,
            this.gameEngine.log.weeks
          );

          //Retrait du listener instancié au début du tour
          this.currentPlayer.socket.off(
            DATA.SAVE_ACTION,
            this.saveActionListener
          );

          this.currentPlayer.socket.emit(ACTIONS.END_TURN);
          console.log(`${this.currentPlayer.name} end turn`);
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

    if (!this.listenersSetUp) {
      this.discussionListener.on("discussionEnd", () => {
        if (this.isAction1()) {
          if (Object.keys(this.newAction1).length !== 0) {
            if (this.newAction1.isCompleted()) {
              this.consolidateAction();
            }
          }
        } else if (this.isAction2()) {
          if (Object.keys(this.newAction2).length !== 0) {
            if (this.newAction2.isCompleted()) {
              this.consolidateAction();
            }
          }
        }
      });

      this.completeProjectPromptListener.on("prolong project", (index) => {
        if (index == null) {
          this.currentPlayer.socket.emit(UPDATE.NO_ONGOING_PROJECTS);
          this.currentPlayer.socket.once(UPDATE.NO_ONGOING_PROJECTS, (data) => {
            this.newAction1.description = data;
            this.consolidateAction();
          });        } else {
          let project = this.gameEngine.map.projects[index];
          project.turns += 3;

          this.gameEngine.log.weeks.logs.forEach((week) => {
            week.actions.forEach((action) => {
              if (
                action.description === project.desc &&
                action.type === "Start Project"
              ) {
                action.turns += 3;
              }
            });
          });
          this.newWeek.actions.forEach((action) => {
            if (
              action.description === project.desc &&
              action.type === "Start Project"
            ) {
              action.turns += 3;
            }
          });

          if (Object.keys(this.newAction1).length !== 0) {
            if (this.newAction1.isCompleted()) {
              this.consolidateAction();
            }
          }
        }
      });

      this.completeProjectPromptListener.on("modify project", (index) => {
        if (index == null) {
          this.currentPlayer.socket.emit(UPDATE.NO_ONGOING_PROJECTS);
          this.currentPlayer.socket.once(UPDATE.NO_ONGOING_PROJECTS, (data) => {
            this.newAction1.description = data;
            this.consolidateAction();
          });
        } else {
          let project = this.gameEngine.map.projects[index];

          this.currentPlayer.socket.emit(UPDATE.ENABLE_DRAWING);
          this.currentPlayer.socket.once(ACTIONS.END_DRAWING, () => {
            this.currentPlayer.socket.emit(UPDATE.PROJECT, {
              type: "Modify",
              description: project.desc,
              playerName: project.player.name,
            });
          });

          this.currentPlayer.socket.once(ACTIONS.COMPLETE_PROJECT, (desc) => {
            this.newAction1.description = desc;

            this.gameEngine.log.weeks.logs.forEach((week) => {
              week.actions.forEach((action) => {
                if (
                  action.description === project.desc &&
                  action.type === "Start Project"
                ) {
                  action.description = desc;
                  project.desc = desc;
                  project.player = this.currentPlayer;
                }
              });
            });
            this.newWeek.actions.forEach((action) => {
              if (
                action.description === project.desc &&
                action.type === "Start Project"
              ) {
                action.description = desc;
                project.desc = desc;
                project.player = this.currentPlayer;
              }
            });

            if (Object.keys(this.newAction1).length !== 0) {
              if (this.newAction1.isCompleted()) {
                this.consolidateAction();
              }
            }
          });
        }
      });

      this.completeProjectPromptListener.on("complete project", (index) => {
        if (index == null) {
          this.currentPlayer.socket.emit(UPDATE.NO_ONGOING_PROJECTS);
          this.currentPlayer.socket.once(UPDATE.NO_ONGOING_PROJECTS, (data) => {
            this.newAction1.description = data;
            this.consolidateAction();
          });        } else {
          let project = this.gameEngine.map.projects[index];

          this.currentPlayer.socket.emit(UPDATE.ENABLE_DRAWING);
          this.currentPlayer.socket.once(ACTIONS.END_DRAWING, () => {
            this.currentPlayer.socket.emit(UPDATE.PROJECT, {
              type: "Complete",
              description: project.desc,
              playerName: project.player.name,
            });
          });

          this.currentPlayer.socket.once(ACTIONS.COMPLETE_PROJECT, (desc) => {
            this.newAction1.description = desc;

            let complProject = {
              orgDesc: project.desc,
              endDesc: desc,
              orgPlayer: project.player.name,
              endPlayer: this.currentPlayer.name,
            };

            project.turns = 0;

            this.gameEngine.log.weeks.logs.forEach((week) => {
              week.actions.forEach((action) => {
                if (
                  action.description === project.desc &&
                  action.type === "Start Project"
                ) {
                  action.turns = 0;
                }
              });
            });
            this.newWeek.actions.forEach((action) => {
              if (
                action.description === project.desc &&
                action.type === "Start Project"
              ) {
                action.turns = 0;
              }
            });

            this.newWeek.completedProjects.push(complProject);

            if (Object.keys(this.newAction1).length !== 0) {
              if (this.newAction1.isCompleted()) {
                this.consolidateAction();
              }
            }
          });
        }
      });

      this.listenersSetUp = true;
    }
  },

  endTurn(gameEngine) {
    this.setGameEngine(gameEngine);
    //--------- Testing purposes, remove after ---------------
    if (this.isAction1() || this.isProjects()) {
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

  isProjects() {
    return this.currentState === playerStates.PROJECTS;
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
      this.currentPlayer.socket.emit(DATA.DRAWN_CARD, card);
      io.to(this.gameEngine.game.config.roomCode).emit(DATA.SEASON, {
        season: card.season,
      });
    } else {
      this.currentPlayer.socket.emit("error", { message: "No cards left." });
    }
  },

  handleSaveData(data) {
    if (this.isAction1()) {
      this.weekBuilder(data, "newAction1");
      io.to(this.gameEngine.game.config.roomCode).emit(UPDATE.ACTION, {
        action: this.newAction1,
        prompt: this.currentPrompt,
      });

      if (Object.keys(this.newAction1).length !== 0) {
        if (this.newAction1.isCompleted()) {
          this.consolidateAction();
        }
      }
    } else if (this.isAction2()) {
      this.weekBuilder(data, "newAction2");
      io.to(this.gameEngine.game.config.roomCode).emit(UPDATE.ACTION, {
        action: this.newAction2,
      });

      if (Object.keys(this.newAction2).length !== 0) {
        if (this.newAction2.isCompleted()) {
          this.consolidateAction();
        }
      }
    }
  },

  consolidateAction() {
    let action = this.isAction1() ? this.newAction1 : this.newAction2;

    if (action.type === "Start Project") {
      this.gameEngine.map.projects.push(
        new Project(action.turns, action.description, this.currentPlayer)
      );
    }

    this.newWeek.actions.push(action);

    if (this.isAction1()) {
      this.transition(playerStates.PROJECTS);
    } else if (this.isAction2()) {
      this.gameEngine.endTurn();
    }
  },

  discuss(action) {
    //Help from ChatGPT
    const currPlayerIdx = this.gameEngine.currentPlayerIndex;
    const len = this.gameEngine.players.length;
    const discussion = [];
    const regex = /\?$/;

    let firstPlayerAskedQuestion = false;
    let count = 0;

    const handleDiscussionData = (data) => {
      let respondingPlayer = (currPlayerIdx + count) % len;
      const reply = {
        player: this.gameEngine.players[respondingPlayer].name,
        statement: data,
      };

      discussion.push(reply);
      this[action].discussion = discussion;
      io.to(this.gameEngine.game.config.roomCode).emit(UPDATE.DISCUSSION, {
        action: this[action],
      });

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
        // Skip over disconnected players
        do {
          count++;
          respondingPlayer = (currPlayerIdx + count) % len;
        } while (
          count < len &&
          !this.gameEngine.players[respondingPlayer].isConnected
        );

        const nextPlayer = (currPlayerIdx + count) % len;
        this.gameEngine.players[nextPlayer].socket.emit(ACTIONS.DISCUSS);
        this.gameEngine.players[nextPlayer].socket.once(
          DATA.DISCUSSION,
          handleDiscussionData
        );
      } else {
        this.discussionListener.emit("discussionEnd");
      }
    };

    // Start with the current player's turn
    this.currentPlayer.socket.emit(ACTIONS.DISCUSS);
    this.currentPlayer.socket.once(DATA.DISCUSSION, handleDiscussionData);
  },

  processProjects(index) {
    //Help from ChatGPT
    if (index >= this.gameEngine.map.projects.length) return; // No more projects left

    let project = this.gameEngine.map.projects[index];
    project.turns--;

    if (project.turns == 0) {
      console.log(`Project ${project.desc} is finished`);

      if (project.player.isConnected) {
        project.player.socket.emit(UPDATE.PROJECT, {
          type: "Complete",
          description: project.desc,
          playerName: project.player.name,
        });

        project.player.socket.once(ACTIONS.COMPLETE_PROJECT, (data) => {
          let complProject = {
            orgDesc: project.desc,
            endDesc: data,
            orgPlayer: project.player.name,
            endPlayer: project.player.name,
          };

          this.newWeek.completedProjects.push(complProject);

          // Process the next project
          this.processProjects(index + 1);
        });
      } else {
        console.log("Player for project", project.desc, "is not connected");
        // If the player for the current project is not connected, just process the next one
        this.processProjects(index + 1);
      }
    } else {
      // If the project is not finished, just process the next one
      this.processProjects(index + 1);
    }
  },

  completeProjectPrompt() {
    if (this.gameEngine.incompleteProjects.incompleteProjects.length === 0) {
      this.completeProjectPromptListener.emit("complete project", null);
    } else {
      this.currentPlayer.socket.emit(ACTIONS.SELECT_INCOMPLETE_PROJECT);
      this.currentPlayer.socket.once(
        ACTIONS.SELECT_INCOMPLETE_PROJECT,
        (data) => {
          this.completeProjectPromptListener.emit("complete project", data);
        }
      );
    }
  },

  weekBuilder(data, action) {
    switch (data.type) {
      case DATA.DESCRIPTION:
        if (action != null) {
          this[action].description = data.value;
          if (this[action].type == "Start Project") {
            if (this.isAction1()) {
              this[action].turns = data.turns + 1;
            } else {
              this[action].turns = data.turns;
            }
          }
        } else {
          console.log("Action does not exit");
        }
        break;
      case SECOND_ACTION.PROJECT:
        this[action] = new ProjectAction("", 0, 0);
        this.currentPlayer.socket.emit(UPDATE.ENABLE_DRAWING);
        this.currentPlayer.socket.once(ACTIONS.END_DRAWING, () => {
          this.currentPlayer.socket.emit(ACTIONS.ADD_DESCRIPTION);
        });
        break;
      case SECOND_ACTION.DISCOVERY:
        this[action] = new DiscoverAction("", 0);
        this.currentPlayer.socket.emit(UPDATE.ENABLE_DRAWING);
        this.currentPlayer.socket.once(ACTIONS.END_DRAWING, () => {
          this.currentPlayer.socket.emit(ACTIONS.ADD_DESCRIPTION);
        });
        break;
      case SECOND_ACTION.DISCUSSION:
        let expectedLength = 0;
        this.gameEngine.players.forEach((player) => {
          if (player.isConnected) {
            expectedLength++;
          }
        });
        this[action] = new DiscussAction("", 0, expectedLength);
        this.discuss(action);
        break;
      case ACTIONS.SELECTED_PROMPT:
        this.currentPrompt =
          this.gameEngine.deck.currentCard.prompts[data.value].description;
        this.newWeek.promptChosen = this.currentPrompt;
        switch (this.gameEngine.deck.currentCard.prompts[data.value].mechanic) {
          case "start project": // enable map for current player
            this[action] = new ProjectAction("", 0, 0);
            this.currentPlayer.socket.emit(UPDATE.ENABLE_DRAWING);
            this.currentPlayer.socket.once(ACTIONS.END_DRAWING, () => {
              this.currentPlayer.socket.emit(ACTIONS.ADD_DESCRIPTION);
            });
            break;
          case "discovery": // enable map for current player
            this[action] = new DiscoverAction("", 0);
            this.currentPlayer.socket.emit(UPDATE.ENABLE_DRAWING);
            this.currentPlayer.socket.once(ACTIONS.END_DRAWING, () => {
              this.currentPlayer.socket.emit(ACTIONS.ADD_DESCRIPTION);
            });
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
            if (
              this.gameEngine.incompleteProjects.incompleteProjects.length > 0
            ) {
              this.currentPlayer.socket.emit(ACTIONS.SELECT_INCOMPLETE_PROJECT);
              this.currentPlayer.socket.once(
                ACTIONS.SELECT_INCOMPLETE_PROJECT,
                (data) => {
                  this.completeProjectPromptListener.emit(
                    "prolong project",
                    data
                  );
                }
              );
            } else {
              this.completeProjectPromptListener.emit("prolong project", null);
            }
            break;
          case "modify project": // enable map for current player
            this[action] = new ModifyAction("", 0);
            if (
              this.gameEngine.incompleteProjects.incompleteProjects.length > 0
            ) {
              this.currentPlayer.socket.emit(ACTIONS.SELECT_INCOMPLETE_PROJECT);
              this.currentPlayer.socket.once(
                ACTIONS.SELECT_INCOMPLETE_PROJECT,
                (data) => {
                  this.completeProjectPromptListener.emit(
                    "modify project",
                    data
                  );
                }
              );
            } else {
              this.completeProjectPromptListener.emit("modify project", null);
            }
            break;
          case "lore": // enable map for current player
            this[action] = new AddLoreAction("", 0);
            this.currentPlayer.socket.emit(UPDATE.ENABLE_DRAWING);
            this.currentPlayer.socket.once(ACTIONS.END_DRAWING, () => {
              this.currentPlayer.socket.emit(ACTIONS.ADD_DESCRIPTION);
            });
            break;
          case "complete project": // enable map for current player
            this[action] = new CompleteProjectAction("", 0);
            this.completeProjectPrompt();
            break;
          case "pause projects":
            this[action] = new PauseProjectsAction("", 0);
            this.currentPlayer.socket.emit(UPDATE.ENABLE_DRAWING);
            this.currentPlayer.socket.once(ACTIONS.END_DRAWING, () => {
              this.currentPlayer.socket.emit(ACTIONS.ADD_DESCRIPTION);
            });
            this.gameEngine.reduceTimers = false;
            break;
          case "modify ressource":
            this[action] = new ModifyRessourcesAction("", 0);
            // Changer le scarcities-abundances object
            break;
          case "end game":
            this[action] = new EndGameAction("", 0);
            break;
          case "end turn": // A tester, incertain
            this.currentState = playerStates.ACTION2;
            this.gameEngine.endTurn();
            break;
          case "discard cards":
            this.gameEngine.deck.discard(2);
            this.currentPlayer.socket.emit(SECOND_TURN.ACTION);
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
