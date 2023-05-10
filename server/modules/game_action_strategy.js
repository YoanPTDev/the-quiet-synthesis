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
    super('StartProject', desc, nbTokens);
    this.turns = nbTour;
  }
}

class DiscoverAction extends GameAction {
  //nbrTour = 0, imageID, coords
  constructor(desc, nbTokens) {
    super('Discovery', desc, nbTokens);
    this.turns = 0;
  }
}

class DiscussAction extends GameAction {
  constructor(desc, nbTokens, nbPlayers) {
    super('Discussion', desc, nbTokens);
    this.discussion = [];
    this.expectedDiscussionLength = nbPlayers;
  }

  isCompleted() {
    return this.discussion.length === expectedDiscussionLength;
  }
}

class AddWeeksAction extends GameAction {
  constructor(desc, nbTokens) {
    super('AddWeeks', desc, nbTokens);
  }
}

class ModifyAction extends GameAction {
  constructor(desc, nbTokens) {
    super('ModifyProject', desc, nbTokens);
  }
}

class RemoveMapElementAction extends GameAction {
  constructor(desc, nbTokens) {
    super('Removal', desc, nbTokens);
  }
}

class AddLoreAction extends GameAction {
  constructor(desc, nbTokens) {
    super('Lore', desc, nbTokens);
  }
}

class CompleteProjectAction extends GameAction {
  constructor(desc, nbTokens) {
    super('Complete Project', desc, nbTokens);
  }
}

class PauseProjectsAction extends GameAction {
  constructor(desc, nbTokens) {
    super('PauseProjects', desc, nbTokens);
  }
}

class ModifyRessourcesAction extends GameAction {
  constructor(desc, nbTokens) {
    super('ModifyRessources', desc, nbTokens);
  }
}

class EndGameAction extends GameAction {
  constructor(desc, nbTokens) {
    super('GameOver', desc, nbTokens);
  }
}

export {
  ProjectAction,
  DiscoverAction,
  DiscussAction,
  AddWeeksAction,
  ModifyAction,
  RemoveMapElementAction,
  AddLoreAction,
  CompleteProjectAction,
  PauseProjectsAction,
  ModifyRessourcesAction,
  EndGameAction,
};
