import React from 'react';
import { connect } from 'react-redux';

const OutOfTurnAction = (props) => {
  const { outOfTurnActions, prompt, cardExpanded } = props;

  const renderOutOfTurnActions = () => {
    if (outOfTurnActions) {
      return (
        <div>
          <div>{outOfTurnActions.type}</div>
          <div>{prompt}</div>
          <div>
            {outOfTurnActions.description}
          </div>
          <div>
            {outOfTurnActions.discussion &&
              outOfTurnActions.discussion.map(
                ({ player, statement }, index) => (
                  <div key={index}>
                    <div>{player}</div>
                    <div>{statement}</div>
                  </div>
                )
              )}
          </div>
        </div>
      );
    }
  };

  if (outOfTurnActions.length === 0 || cardExpanded) {
    return null;
  }

  return (
    <div className='out-of-turn-action-container'>
      <div className='out-of-turn-action-list'>{renderOutOfTurnActions()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    outOfTurnActions: state.outOfTurnAction.outOfTurnActions,
    prompt: state.outOfTurnAction.prompt,
    cardExpanded: state.settings.cardExpanded,
  };
};

export default connect(mapStateToProps)(OutOfTurnAction);
