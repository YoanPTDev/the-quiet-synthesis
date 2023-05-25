import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { collapseAdventureLogInput } from '../actions/settings';
import TextAreaField from './TextAreaField';
import { DATA } from '../../../utils/constants.mjs';
import DiceGadget from './DiceGadget';

const AdventureLogInput = ({ onSave, collapse }) => (
  <TextAreaField
    placeholder='Add a description to your action...'
    onSave={(value) => {
      if (value !== '') {
        onSave(value);
      }
    }}
    collapse={collapse}
  />
);

const AdventureLogInputWrapper = (props) => {
  const { dispatch, adventureLogInputExpanded, outOfTurnActions } = props;
  const socket = useContext(SocketContext);

  const [diceValue, setDiceValue] = useState(0);

  const showDiceGadget = outOfTurnActions.type === 'Start Project';

  useEffect(() => {
    if (showDiceGadget) {
      setDiceValue(1);
      console.log('useEffect', diceValue);
    }
  }, [showDiceGadget]);

  const handleDiceRoll = (value) => {
    setDiceValue(value);
  };

  if (!adventureLogInputExpanded) return null;

  return (
    <div className='input-container centered-column'>
      {showDiceGadget && (
        <DiceGadget
          onRoll={handleDiceRoll}
          diceValue={diceValue}
        />
      )}
      <AdventureLogInput
        onSave={(description) => {
          if (description !== '') {
            const data = {
              type: 'DESCRIPTION_DATA',
              value: description,
              turns: diceValue,
            };
            socket.emit(DATA.SAVE_ACTION, data);
            dispatch(collapseAdventureLogInput())
          }
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    adventureLogInputExpanded: state.settings.adventureLogInputExpanded,
    outOfTurnActions: state.outOfTurnAction.outOfTurnActions,
  };
};

export default connect(mapStateToProps)(AdventureLogInputWrapper);
