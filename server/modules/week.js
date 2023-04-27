import {
  ProjectAction,
  DiscoverAction,
  DiscussAction,
  AddWeeksAction,
  ModifyAction,
  RemoveMapElementAction,
} from './game_action_strategy.js';

class Week {

  build(nbWeek, pID, cardID, prompt) {
    newWeek = {
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
