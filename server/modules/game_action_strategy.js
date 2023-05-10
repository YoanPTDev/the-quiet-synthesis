class GameAction {
  // type, description, nbrTokens
  static build(type, desc, nbTokens) {
    let newAction = {
      type: type,
      tokens: nbTokens,
      description: desc,
    };

    return newAction;
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
  static build(desc, nbTokens, nbTour) {
    let newAction = super.build('StartProject', desc, nbTokens);
    newAction.turns = nbTour;

    return newAction;
  }
}

class DiscoverAction extends GameAction {
  //nbrTour = 0, imageID, coords
  static build(desc, nbTokens) {
    let newAction = super.build('Discovery', desc, nbTokens);
    newAction.turns = 0;

    return newAction;
  }
}

class DiscussAction extends GameAction {
  static build(desc, nbTokens, nbPlayers) {
    let newAction = super.build('Discussion', desc, nbTokens);
    newAction.discussion = [];
    let expectedDiscussionLength = nbPlayers;

    return newAction;
  }

  isCompleted() {
    return newAction.discussion.length === 4;
  }
}

class AddWeeksAction extends GameAction {
  static build(desc, nbTokens) {
    let newAction = super.build('AddWeeks', desc, nbTokens);

    return newAction;
  }
}

class ModifyAction extends GameAction {
  static build(desc, nbTokens) {
    let newAction = super.build('ModifyProject', desc, nbTokens);

    return newAction;
  }
}

class RemoveMapElementAction extends GameAction {
  static build(desc, nbTokens) {
    let newAction = super.build('Removal', desc, nbTokens);

    return newAction;
  }
}

class AddLoreAction extends GameAction {
  static build(desc, nbTokens) {
    let newAction = super.build('Lore', desc, nbTokens);

    return newAction;
  }
}

class CompleteProjectAction extends GameAction {
  static build(desc, nbTokens) {
    let newAction = super.build('Complete Project', desc, nbTokens);

    return newAction;
  }
}

class PauseProjectsAction extends GameAction {
  static build(desc, nbTokens) {
    let newAction = super.build('PauseProjects', desc, nbTokens);

    return newAction;
  }
}

class ModifyRessourcesAction extends GameAction {
  static build(desc, nbTokens) {
    let newAction = super.build('ModifyRessources', desc, nbTokens);

    return newAction;
  }
}

class EndGameAction extends GameAction {
  static build(desc, nbTokens) {
    let newAction = super.build('GameOver', desc, nbTokens);

    return newAction;
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
