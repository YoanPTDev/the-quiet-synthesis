import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCard } from '../actions/card';
import { collapseCard, expandCard } from '../actions/settings';
import { SocketContext } from '../middleware/socketcontext';
import Hearts from '../assets/Hearts.png';
import Diamonds from '../assets/Diamonds.png';
import Clubs from '../assets/Clubs.png';
import Spades from '../assets/Spades.png';
import { ACTIONS, DATA } from '../../../utils/constants.mjs';

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

const Card = ({ card, fetchCard, cardExpanded, expandCard, collapseCard }) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on(DATA.DRAWN_CARD, (data) => {
        fetchCard(data);
      });

      return () => {
        socket.off(DATA.DRAWN_CARD);
      };
    }
  }, [socket, fetchCard]);

  useEffect(() => {
    if (card.id !== '') {
      expandCard();
    }
  }, [card, expandCard]);

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

  if (!cardExpanded) {
    return null;
  }

  return (
    <div
      key={id}
      className='card-item'
      style={{ backgroundColor: cardColor[season] }}>
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
              className='prompt-wrapper'
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return { card: state.card, cardExpanded: state.settings.cardExpanded };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCard: (data) => dispatch(fetchCard(data)),
    expandCard: () => dispatch(expandCard()),
    collapseCard: () => dispatch(collapseCard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
