import React from 'react';
import { connect } from 'react-redux';

const OutOfTurnAction = (props) => {
  const { OutOfTurnActions } = props;

  const renderOutOfTurnActions = () => {
    if (OutOfTurnActions) {
      let i = 0;
      return OutOfTurnActions.map((action) => {
        i++;
        console.log('action ', i, action);
      });
    }
  };

  return (
    <div className='out-of-turn-action-container'>
      <div className='out-of-turn-action-list'>{renderOutOfTurnActions}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    outOfTurnActions: state.outOfTurnAction.outOfTurnActions,
  };
};

export default connect(mapStateToProps)(OutOfTurnAction);
