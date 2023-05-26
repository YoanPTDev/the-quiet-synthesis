// components/AdventureLogWrapper.js
// Ce composant React connecté à Redux 
// affiche le adventure log en temps et lieu grâce aux settings dans le store
// Il implémente le Adventure Log, n'est qu'un wrapper pour l'afficher au click.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React from 'react';
import { connect } from 'react-redux';
import AdventureLog from './AdventureLog';
import { expandAdventureLog, collapseAdventureLog } from '../actions/settings';
import { addRipple } from '../animations';
import { AnimatePresence } from 'framer-motion';


const AdventureLogWrapper = (props) => {
  const { adventureLogExpanded, expandAdventureLog, collapseAdventureLog } =
    props;

  const toggleAdventureLog = () => {
    if (adventureLogExpanded) {
      collapseAdventureLog();
    } else {
      expandAdventureLog();
    }
  };

  return (
    <div>
      <button onClick={(event) => {addRipple(event, "var(--log-button)"); toggleAdventureLog();}} className='menu-button adv-button'>
        <div className='adv-button-icon'></div>
        {/* {adventureLogExpanded ? 'Hide Adventure Log' : 'Show Adventure Log'} */}
      </button>
      <AnimatePresence>
        {adventureLogExpanded && <AdventureLog />}
      </AnimatePresence>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    adventureLogExpanded: state.settings.adventureLogExpanded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    expandAdventureLog: () => dispatch(expandAdventureLog()),
    collapseAdventureLog: () => dispatch(collapseAdventureLog()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdventureLogWrapper);
