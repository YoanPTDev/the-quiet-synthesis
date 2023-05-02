import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCard } from '../actions/card';
import { SocketContext } from '../middleware/socketcontext';

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
      console.log(idxPrompt);
      socket.emit('sendChosenPrompt', idxPrompt);
    }
  };

  return (
    <div
      key={id}
      className='card-item'>
      <div>
        <h3>
          {value} of {suit} {season}
        </h3>
      </div>
      {prompts.map((prompt) => {
        return (
          <button
            className='card-prompt'
            key={prompts.indexOf(prompt)}
            onClick={() => handleButtonClick(prompts.indexOf(prompt))}>
            {prompt}
          </button>
        );
      })}
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
