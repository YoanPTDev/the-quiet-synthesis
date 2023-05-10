import React, { useContext, useState } from 'react';
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
import { SAVE_ACTION_DATA } from '../../../utils/constants.mjs';

const diceNum = {
  1: one,
  2: two,
  3: three,
  4: four,
  5: five,
  6: six,
};

const DiceGadget = ({ onRoll }) => {
  const [diceValue, setDiceValue] = useState(1);

  const handleRoll = () => {
    const newValue = (diceValue % 6) + 1;
    setDiceValue(newValue);
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

const AdventureLogInput = (props) => (
  <TextAreaField
    {...props}
    placeholder='Add a description to your action...'
    onSave={(value) => {
      if (value !== '') {
        const data = {
          type: 'DESCRIPTION_DATA',
          value: value,
          turns: diceValue,
        };
        props.onSave(data);
      }
    }}
    collapse={props.collapse}
  />
);

const AdventureLogInputWrapper = (props) => {
  const { dispatch, adventureLogInputExpanded } = props;

  const socket = useContext(SocketContext);

  const handleDiceRoll = (value) => {
    console.log(`Dice rolled: ${value}`);
  };

  if (!adventureLogInputExpanded) return null;

  return (
    <div className='input-container'>
      <DiceGadget onRoll={handleDiceRoll} />
      <AdventureLogInput
        onSave={(data) => {
          socket.emit(SAVE_ACTION_DATA, data);
        }}
        collapse={() => dispatch(collapseAdventureLogInput())}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    adventureLogInputExpanded: state.settings.adventureLogInputExpanded,
  };
};

export default connect(mapStateToProps)(AdventureLogInputWrapper);
