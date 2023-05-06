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

  execute() {
    //Incertain, a revoir
  }
}

class ProjectAction extends GameAction {
  //nbrTour, imageID, coords
  static build(desc, nbTokens, nbTour) {
    let newAction = super.build('StartProject', desc, nbTokens);
    newAction.turns = nbTour;

    return newAction;
  }

  execute() {
    //WIP
  }
}

class DiscoverAction extends GameAction {
  //nbrTour = 0, imageID, coords
  static build(desc, nbTokens) {
    let newAction = super.build('Discovery', desc, nbTokens);
    newAction.turns = 0;

    return newAction;
  }

  execute() {
    //WIP
  }
}

class DiscussAction extends GameAction {
  static build(desc, nbTokens) {
    let newAction = super.build('Discussion', desc, nbTokens);
    newAction.discussion = [];

    return newAction;
  }

  execute() {
    //WIP
  }
}

class AddWeeksAction extends GameAction {
  static build(desc, nbTokens) {
    let newAction = super.build('AddWeeks', desc, nbTokens);

    return newAction;
  }

  execute(project, ammount) {
    project.timer += ammount;
  }
}

class ModifyAction extends GameAction {
  static build(desc, nbTokens) {
    let newAction = super.build('ModifyProject', desc, nbTokens);

    return newAction;
  }

  execute(project, modification) {
    project.description = modification;
  }
}

class RemoveMapElementAction extends GameAction {
  static build(desc, nbTokens) {
    let newAction = super.build('Removal', desc, nbTokens);

    return newAction;
  }

  execute() {
    //WIP
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
