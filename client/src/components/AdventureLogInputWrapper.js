import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { collapseAdventureLogInput } from '../actions/settings';
import TextAreaField from './TextAreaField';
import one from '../assets/one.png';
import two from '../assets/two.png';
import three from '../assets/three.png';
import four from '../assets/four.png';
import five from '../assets/five.png';
import six from '../assets/six.png';
import { DATA } from '../../../utils/constants.mjs';

const diceNum = {
  1: one,
  2: two,
  3: three,
  4: four,
  5: five,
  6: six,
};

const DiceGadget = ({ onRoll, diceValue }) => {
  const handleRoll = () => {
    const newValue = (diceValue % 6) + 1;
    onRoll(newValue);
  };

  return (
    <img
      src={diceNum[diceValue]}
      alt={`Dice face ${diceValue}`}
      onClick={handleRoll}
    />
  );
};

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

  const showDiceGadget = outOfTurnActions.type === 'StartProject';

  useEffect(() => {
    if (showDiceGadget) {
      setDiceValue(1);
      console.log('useEffect', diceValue);
    }
  }, [showDiceGadget]);

  const handleDiceRoll = (value) => {
    console.log(`Dice rolled: ${value}`);
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
          }
        }}
        collapse={() => dispatch(collapseAdventureLogInput())}
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
