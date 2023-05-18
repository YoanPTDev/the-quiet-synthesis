import React from 'react';
import { connect } from 'react-redux';
import AdventureLog from './AdventureLog';
import { expandAdventureLog, collapseAdventureLog } from '../actions/settings';
import { addRipple } from '../animations';

const AdventureLogWrapper = (props) => {
  const { adventureLogExpanded, expandAdventureLog, collapseAdventureLog } =
    props;

  const toggleAdventureLog = () => {
    console.log('1')
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
