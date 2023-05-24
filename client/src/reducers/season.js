import { DATA } from "../../../utils/constants.mjs";

const INITIAL_STATE = {
  season: '',
};

const seasonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA.SEASON:
      return { ...state, season: action.season };
    default:
      return state;
  }
};

export default seasonReducer;