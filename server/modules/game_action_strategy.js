class GameAction {
  // type, description, nbrTokens
  constructor(type, desc, nbTokens) {
    this.type = type;
    this.tokens = nbTokens;
    this.description = desc;
  }
  
  /**
   * each class that implements GameAction will need to redefine this method.
   * It defines a condition that will tell the engine if it needs to transition to the next turn state or not.
   * The engine will call on this function every time the Front-End returns input from the user.
   * @returns a boolean that specifies if the condition to transition is met.
   */
  isCompleted() {
    throw new Error(`Unable to confirm if condition for transiting to next state has been met, 'isCompleted' method in ${this.constructor.name} is not defined`);
  }
}

class ProjectAction extends GameAction {
  //nbrTour, imageID, coords
  constructor(desc, nbTokens, nbTour) {
    super('Start Project', desc, nbTokens);
    this.turns = nbTour;
  }

  isCompleted() {
    return this.description !== '' && this.turns > 0;
  }
}

class DiscoverAction extends GameAction {
  //nbrTour = 0, imageID, coords
  constructor(desc, nbTokens) {
    super('Discovery', desc, nbTokens);
    this.turns = 0;
  }

  isCompleted() {
    return this.description !== '';
  }
}

class DiscussAction extends GameAction {
  constructor(desc, nbTokens, nbPlayers) {
    super('Discussion', desc, nbTokens);
    this.discussion = [];
    this.expectedDiscussionLength = nbPlayers;
  }

  isCompleted() {
    return this.discussion.length === this.expectedDiscussionLength;
  }
}

class AddWeeksAction extends GameAction {
  constructor(desc, nbTokens) {
    super('Add Weeks', desc, nbTokens);
  }
  
  isCompleted() {
    return true; //placeholder
  }
}

class ModifyAction extends GameAction {
  constructor(desc, nbTokens) {
    super('Modify Project', desc, nbTokens);
  }

  isCompleted() {
    return this.description !== '';
  }
}

class AddLoreAction extends GameAction {
  constructor(desc, nbTokens) {
    super('Lore', desc, nbTokens);
  }

  isCompleted() {
    return this.description !== '';
  }
}

class CompleteProjectAction extends GameAction {
  constructor(desc, nbTokens) {
    super('Complete Project', desc, nbTokens);
  }

  isCompleted() {
    return this.description !== '';
  }
}

class PauseProjectsAction extends GameAction {
  constructor(desc, nbTokens) {
    super('Pause Projects', desc, nbTokens);
  }

  isCompleted() {
    return this.description !== '';
  }
}

class ModifyRessourcesAction extends GameAction {
  constructor(desc, nbTokens) {
    super('Modify Ressources', desc, nbTokens);
  }

  isCompleted() {
    return true; //placeholder
  }
}

class EndGameAction extends GameAction {
  constructor(desc, nbTokens) {
    super('Game Over', desc, nbTokens);
  }

  isCompleted() {
    return this.description !== '';
  }
}

export {
  ProjectAction,
  DiscoverAction,
  DiscussAction,
  AddWeeksAction,
  ModifyAction,
  AddLoreAction,
  CompleteProjectAction,
  PauseProjectsAction,
  ModifyRessourcesAction,
  EndGameAction,
};
