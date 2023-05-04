import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCard } from '../actions/card';
import { SocketContext } from '../middleware/socketcontext';
import Hearts from '../assets/Hearts.png'
import Diamonds from '../assets/Diamonds.png'
import Clubs from '../assets/Clubs.png'
import Spades from '../assets/Spades.png'


const cardColor = {
  'Spring': '#9fb261',
  'Summer': '#e0bc66',
  'Fall': '#ac6f43',
  'Winter': '#5882b2' 
}

const cardSuit = {
  'Hearts': Hearts,
  'Diamonds': Diamonds,
  'Clubs': Clubs,
  'Spades': Spades
}

const Card = ({ card, fetchCard }) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on('cardData', (data) => {
        fetchCard(data);
      });

      return () => {
        socket.off('cardData');
      };
    }
  }, [socket, fetchCard]);

  if (card.id === '') return null;

  const { id, value, suit, season, prompts } = card;

  const handleButtonClick = (idxPrompt) => {
    if (socket) {
      let data = {
        type: 'chosenPrompt',
        value: idxPrompt
      }

      socket.emit('saveData', data);
    }
  };

  return (
    <div
    key={id}
    className='card-item' style={{ backgroundColor: cardColor[season] }}>
    <div>
      <h3 className='card-title'>
        <img src={cardSuit[suit]} alt="suit-icon" className="suit-icon"/> 
        <div style={{margin:'20px'}}></div>
        <div>{value}</div> 
        <div>{season}</div>
      </h3>
    </div>
    <div className='card-prompts'>
      {prompts && prompts.map((prompt, index) => (
        <div className='prompt-wrapper' key={`${id}-${index}`}>
          <button
            className='card-prompt'
            onClick={() => handleButtonClick(index)}>
            {prompt.description}
          </button>
          {prompts.length === 2 && index === 0 && (
            <div>
              <br />
              <p style={{ fontStyle: 'italic', fontFamily: "'Martel', serif" }}>or...</p>
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
  return { card: state.card };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCard: (data) => dispatch(fetchCard(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
// export default Card;
