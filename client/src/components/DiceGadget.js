// components/DiceGadget.js
// Composant React qui affiche une image d'un dé dont la valeur peut 
// être modifiée par un clic, déclenchant une fonction onRoll avec la 
// nouvelle valeur du dé.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import one from '../assets/one.png';
import two from '../assets/two.png';
import three from '../assets/three.png';
import four from '../assets/four.png';
import five from '../assets/five.png';
import six from '../assets/six.png';

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
    <div>
      <img
        src={diceNum[diceValue]}
        alt={`Dice face ${diceValue}`}
        onClick={handleRoll}
      />
    </div>
  );
};

export default DiceGadget;