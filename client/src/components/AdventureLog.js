import React, { useContext } from 'react';
import { connect } from 'react-redux';
import InputField from './InputField'
import { SocketContext } from '../middleware/socketcontext';
import { ADVENTURE_LOG_DESCRIPTION, SAVE_LOG_DATA } from '../../../utils/constants';

const AdventureLogInput = (props) => (
  <InputField
    {...props}
    placeholder="Add an AdventureLog entry"
    onSave={(value) => {
      const data = {
        type: ADVENTURE_LOG_DESCRIPTION,
        value: value,
      };
      props.onSave(data);
    }}
  />
);

const AdventureLog = (props) => {
  const socket = useContext(SocketContext);
  const { logs } = props;

  const renderAdventureLogData = () => {
    if (logs) {
      return logs.map((log) => {
        const { weekNb, playerId, cardIdDrawn, promptChosen, actions } = log;
        const { type, tokens, turns, description } = actions[0];

        return (
          <div
            key={weekNb}
            className='log'>
            <p>
              Week {weekNb} {' - '} {type} {' by '}{' '}
              {playerId ? playerId : 'an unknown player'}
            </p>
            <p>Prompt: {promptChosen}</p>
            <p>
              Contempt token{tokens > 1 ? 's' : ''}: {tokens}
            </p>
            <p>Specifics: {description}</p>
            {turns > 0 ? <p>Ready in {turns} turns</p> : ''}
          </div>
        );
      });
    }
  };

  return (
    <div className='adventure-log-container'>
      <h2>Adventure Log</h2>
      <hr />
      <div className='list-log'>{renderAdventureLogData()}</div>
      <AdventureLogInput
        onSave={(data) => {
          socket.emit(SAVE_LOG_DATA, data);
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
