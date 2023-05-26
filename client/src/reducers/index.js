// reducers/index.js
// Ceci est un fichier qui rassemble tous les reducers de l'application Redux, 
// en les associant à leurs clés respectives 
// dans l'état global de l'application, formant ainsi le rootReducer.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import cardReducer from './card';
import settingsReducer from './settings';
import notebookReducer from './notebook.js';
import adventureLogReducer from './adventureLog';
import scarcityAbundanceReducer from './scarcityAbundance';
import outOfTurnActionReducer from './outOfTurnAction';
import directionsReducer from './directions';
import incompleteProjectsReducer from './incompleteProject';

const rootReducer = {
  settings: settingsReducer,
  card: cardReducer,
  note: notebookReducer,
  log: adventureLogReducer,
  scarcity_abundance: scarcityAbundanceReducer,
  outOfTurnAction: outOfTurnActionReducer,
  direction: directionsReducer,
  incompleteProject: incompleteProjectsReducer,
};

export default rootReducer;
