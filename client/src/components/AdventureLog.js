import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { expandAdventureLog, collapseAdventureLog } from '../actions/settings';
import Log from './Log';
import AdventureLogInput from './AdventurelogInput';
import { SocketContext } from '../middleware/socketcontext';

const AdventureLog = (props) => {
  const { adventureLogExpanded, expandAdventureLog, collapseAdventureLog } =
    props;
  const socket = useContext(SocketContext);
  
  if (adventureLogExpanded) {
    return (
      <div>
        <h2>Adventure Log</h2>
        <Log />
        <hr />
        <AdventureLogInput
          onSave={(data) => {
            console.log('data', data);
            socket.emit('saveData', data);
          }}
        />
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

const mapDispatchToProps = (dispatch) => {
  return {
    expandAdventureLog: () => dispatch(expandAdventureLog()),
    collapseAdventureLog: () => dispatch(collapseAdventureLog()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdventureLog);

// Shorthand syntaxe
// export default connect(
//   state => ({adventureLogExpanded: state.adventureLogExpanded}),
//   {expandAdventureLog, collapseAdventureLog}
// )(AdventureLog);
