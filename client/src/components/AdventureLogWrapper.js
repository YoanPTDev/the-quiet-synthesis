import React from 'react';
import { connect } from 'react-redux';
import AdventureLog from './AdventureLog';
import { expandAdventureLog, collapseAdventureLog } from '../actions/settings';

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
      <button onClick={toggleAdventureLog}>
        {adventureLogExpanded ? 'Hide Adventure Log' : 'Show Adventure Log'}
      </button>
      {adventureLogExpanded && <AdventureLog />}
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
