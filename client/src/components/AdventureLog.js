// components/AdventureLog.js
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import AdventureLogInput from './AdventurelogInput';
import { SocketContext } from '../middleware/socketcontext';

const AdventureLog = (props) => {
  const socket = useContext(SocketContext);
  console.log(props);
  const { logs } = props;

  const renderAdventureLogData = () => {
    if (logs) {
      return logs.map((log) => <p key={log.weekNb}>{log.actions[0].description}</p>)
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
    logs: state.log.logs,
  };
};

export default connect(mapStateToProps)(AdventureLog);
