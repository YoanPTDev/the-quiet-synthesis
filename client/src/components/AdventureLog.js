import React from 'react';
import { connect } from 'react-redux';

const AdventureLog = (props) => {
  const { logs } = props;

  const renderAdventureLogData = () => {
    if (logs) {
      return logs.map((log) => {
        const { weekNb, playerId, cardIdDrawn, promptChosen, actions } = log;

        return (
          <div
            key={weekNb}
            className='log'>
            <p>
              <strong>Week:</strong> {weekNb} - {playerId ? playerId : 'an unknown player'}
            </p>
            <p><strong>Prompt: </strong> {promptChosen}</p>
            {actions.map((action, index) => {
              const { type, tokens, turns, description } = action;

              return (
                <div
                  key={`${weekNb}-${index}`}
                  className='action'>
                  <p>
                    <strong>Type: </strong> {type}
                  </p>
                  <p>
                    <strong>Contempt token{tokens > 1 ? 's' : ''}:</strong> {tokens}
                  </p>
                  <p><strong>Specifics: </strong> {description}</p>
                  <strong>{turns > 0 ? <p>Ready in {turns} turns</p> : ''}</strong>
                </div>
              );
            })}
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
