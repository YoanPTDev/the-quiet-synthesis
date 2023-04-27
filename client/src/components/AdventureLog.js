// components/AdventureLog.js
import React, { useContext } from 'react';
import Log from './Log';
import AdventureLogInput from './AdventurelogInput';
import { SocketContext } from '../middleware/socketcontext';

const AdventureLog = () => {
  const socket = useContext(SocketContext);

  return (
    <div className="adventure-log-container">
      <h2>Adventure Log</h2>
      <Log />
      <hr />
      <AdventureLogInput
        onSave={(data) => {
          socket.emit('saveData', data);
        }}
      />
      <hr />
    </div>
  );
};

export default AdventureLog;
