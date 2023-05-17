import React from 'react';
import { connect } from 'react-redux';

const AdventureLog = (props) => {
  const { logs } = props;

  const renderAdventureLogData = () => {
    if (logs) {
      return logs.map((log) => {
        const { weekNb, playerId, promptChosen, actions, completedProjects } =
          log;
        console.log('completedProjects', completedProjects);

        return (
          <div
            key={weekNb}
            className='log'>
            <p>
              <strong>Week:</strong> {weekNb} -{' '}
              {playerId ? playerId : 'an unknown player'}
            </p>
            <p>
              <strong>Prompt: </strong> {promptChosen}
            </p>
            {actions.map((action, index) => {
              const { type, tokens, turns, description, discussion } = action;

              return (
                <div
                  key={`${weekNb}-${index}`}
                  className='action'>
                  <div>
                    <strong>Type: </strong> {type}{' '}
                    {type === 'StartProject' && turns === 0 && (
                      <strong>COMPLETED</strong>
                    )}
                  </div>
                  <div>
                    <strong>Contempt token{tokens > 1 ? 's' : ''}:</strong>{' '}
                    {tokens}
                  </div>
                  <div>
                    {discussion !== undefined && (
                      <>
                        {discussion.map(({ player, statement }, index) => (
                          <div key={index}>
                            <div>
                              <strong>{player}: </strong>
                              {statement}
                            </div>
                          </div>
                        ))}
                        <strong></strong>
                      </>
                    )}
                    {discussion === undefined && (
                      <>
                        <strong>Specifics: </strong> {description}
                      </>
                    )}
                  </div>
                  <strong>
                    {turns > 0 ? <p>Ready in {turns} turns</p> : ''}
                  </strong>
                </div>
              );
            })}
            <br />
            {completedProjects.length > 0 && (
              <div>
                <div className='centered-column'>
                  <h3>Project completed this week!</h3>
                </div>
                {completedProjects.map(
                  ({ orgDesc, endDesc, orgPlayer, endPlayer }, index) => (
                    <div key={index}>
                      <hr/>
                      <div>
                        <strong>{orgPlayer}: </strong>
                        {orgDesc}
                      </div>
                      <div>
                        <strong>{endPlayer}: </strong>
                        {endDesc}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
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
