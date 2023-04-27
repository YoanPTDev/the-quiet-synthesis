// components/AdventureLog.js
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import AdventureLogInput from './AdventurelogInput';
import { SocketContext } from '../middleware/socketcontext';

const AdventureLog = (props) => {
  const socket = useContext(SocketContext);
  const { weeks } = props;

  const renderAdventureLogData = () => {
    if (weeks) {
      return weeks.map((week) => <p>{week}</p>)
    }
  }

  return (
    <div className="adventure-log-container">
      <h2>Adventure Log</h2>
      <hr />
      {renderAdventureLogData()}
      <AdventureLogInput
        onSave={(data) => {
          socket.emit('saveData', data);
        }}
      />
      <hr />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    weeks: state.week.weeks,
  };
};

export default connect(mapStateToProps)(AdventureLog);
