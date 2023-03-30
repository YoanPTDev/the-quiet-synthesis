class GameAction {
  execute() {
    //Incertain, a revoir
  }
}

class ProjectAction extends GameAction {
  execute() {
    //WIP
  }
}

class DiscoverAction extends GameAction {
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