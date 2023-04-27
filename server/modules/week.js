import {
  ProjectAction,
  DiscoverAction,
  DiscussAction,
  AddWeeksAction,
  ModifyAction,
  RemoveMapElementAction,
} from './game_action_strategy.js';

class Week {

  static build(nbWeek, pID, cardID, prompt) {
    let newWeek = {
      weekNb : nbWeek,
      playerId : pID,
      cardIdDrawn : cardID,
      promptChosen : prompt,
      actions : []
    };

    return newWeek;
  }
}

export default Week;
