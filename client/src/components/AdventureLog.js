import React from 'react';
import { connect } from 'react-redux';
import { expandAdventureLog, collapseAdventureLog } from '../actions/settings';
import Log from './Log';

const AdventureLog = (props) => {
  const { adventureLogExpanded, expandAdventureLog, collapseAdventureLog } =
    props;

  if (adventureLogExpanded) {
    return (
      <div>
        <h2>Adventure Log</h2>
        <p>Ceci est le carnet d'aventure ! </p>
        <br />
        <Log />
        <hr />
        <button onClick={collapseAdventureLog}>show less</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Adventure Log</h2>
      <br />
      <button onClick={expandAdventureLog}>read more</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    adventureLogExpanded: state.settings.adventureLogExpanded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    expandAdventureLog: () => dispatch(expandAdventureLog()),
    collapseAdventureLog: () => dispatch(collapseAdventureLog())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventureLog);













// Shorthand syntaxe
// export default connect(
//   state => ({adventureLogExpanded: state.adventureLogExpanded}),
//   {expandAdventureLog, collapseAdventureLog}
// )(AdventureLog);