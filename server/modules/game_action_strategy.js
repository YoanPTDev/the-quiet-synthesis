class GameAction {
  // type, description, nbrTokens
  static build(type, desc, nbTokens) {
    let newAction = {
      type : type,
      tokens : nbTokens,
      description : desc,
    };

    return newAction;
  }

  execute() {
    //Incertain, a revoir
  }
}

class ProjectAction extends GameAction {
  //nbrTour, imageID, coords
  static build(type, desc, nbTokens, nbTour, imageID, coords) {
    let newAction = super.build(type, desc, nbTokens);
    newAction.turns = nbTour;
    newAction.imageId = imageID;
    newAction.coordinates = coords;

    return newAction;
  }

  execute() {
    //WIP
  }
}

class DiscoverAction extends GameAction {
  //nbrTour = 0, imageID, coords
  static build(type, desc, nbTokens, imageID, coords) {
    let newAction = super.build(type, desc, nbTokens);
    newAction.turns = 0;
    newAction.imageId = imageID;
    newAction.coordinates = coords;

    return newAction;
  }

  execute() {
    //WIP
  }
}

class DiscussAction extends GameAction {
  execute() {
    //WIP
  }
}

class AddWeeksAction extends GameAction {
  execute(project, ammount) {
    project.timer += ammount;
  }
}

class ModifyAction extends GameAction {
  execute(project, modification) {
    project.description = modification;
  }
}

class RemoveMapElementAction extends GameAction {
  execute() {
    //WIP
  }
}

export { ProjectAction, DiscoverAction, DiscussAction, AddWeeksAction, ModifyAction, RemoveMapElementAction };