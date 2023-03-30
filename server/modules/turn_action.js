import {
  ProjectAction,
  DiscoverAction,
  DiscussAction,
  AddWeeksAction,
  ModifyAction,
  RemoveMapElementAction,
} from './game_action_strategy';

class TurnAction {
  constructor() {
    this.contempts = new Array(); //Array de contempt tokens
    this.action = null; //Un des objets Action importe plus haut
  }

  setAction(action) {
    this.action = action;
  }
}

export default TurnAction;
