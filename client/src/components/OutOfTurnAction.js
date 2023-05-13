import React from 'react';
import { connect } from 'react-redux';

const OutOfTurnAction = (props) => {
  const { outOfTurnActions, prompt } = props;

  const renderOutOfTurnActions = () => {
    if (outOfTurnActions) {
      return (
        <div>
          <div>{outOfTurnActions.type}</div>
          <div>{prompt}</div>
          <div>{outOfTurnActions.description}</div>
        </div>
      );
    }
  };

  if (outOfTurnActions.length === 0) {
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
