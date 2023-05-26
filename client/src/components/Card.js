// components/Card.js
// Ce composant React connecté à Redux 
// affiche la carte pigé et ses informations lorsqu'elle sont recueillies dans le 
// store au moment de la pige. 
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { collapseCard, expandCard } from '../actions/settings';
import { SocketContext } from '../middleware/socketcontext';
import Hearts from '../assets/Hearts.png';
import Diamonds from '../assets/Diamonds.png';
import Clubs from '../assets/Clubs.png';
import Spades from '../assets/Spades.png';
import { ACTIONS, DATA } from '../../../utils/constants.mjs';
import { motion, AnimatePresence } from 'framer-motion';

const cardColor = {
  Spring: '#9fb261',
  Summer: '#e0bc66',
  Fall: '#ac6f43',
  Winter: '#5882b2',
};

const cardSuit = {
  Hearts: Hearts,
  Diamonds: Diamonds,
  Clubs: Clubs,
  Spades: Spades,
};

const Card = ({ card, cardExpanded, expandCard, collapseCard }) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (card.id !== '') {
      expandCard();
    }
  }, [card]);

  const { id, value, suit, season, prompts } = card;

  const handleButtonClick = (idxPrompt) => {
    if (socket) {
      let data = {};
      data = {
        type: ACTIONS.SELECTED_PROMPT,
        value: idxPrompt,
      };

      collapseCard();

      socket.emit(DATA.SAVE_ACTION, data);
    }
  };

  return (
    <AnimatePresence>
      {cardExpanded && (
        <motion.div
          key={id}
          className='card-item'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: cardColor[season] }}
        >
        <div>
          <h3 className='card-title'>
            <img
              src={cardSuit[suit]}
              alt='suit-icon'
              className='suit-icon'
            />
            <div style={{ margin: '20px' }}></div>
            <div>{value}</div>
            <div>{season}</div>
          </h3>
        </div>
        <div className='card-prompts'>
          {prompts &&
            prompts.map((prompt, index) => (
              <div
                className='prompt-wrapper centered-column'
                key={`${id}-${index}`}>
                <button
                  className='card-prompt'
                  onClick={() => handleButtonClick(index)}>
                  {prompt.description}
                </button>
                {prompts.length === 2 && index === 0 && (
                  <div>
                    <br />
                    <p
                      style={{
                        fontStyle: 'italic',
                        fontFamily: "'Martel', serif",
                      }}>
                      or...
                    </p>
                    <br />
                  </div>
                )}
              </div>
            ))}
        </div>
      </motion.div>
        )}
    </AnimatePresence>
  );
};

const mapStateToProps = (state) => {
  return { card: state.card, cardExpanded: state.settings.cardExpanded };
};

const mapDispatchToProps = (dispatch) => {
  return {
    expandCard: () => dispatch(expandCard()),
    collapseCard: () => dispatch(collapseCard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
