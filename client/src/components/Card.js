import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCard } from '../actions/card';
import { collapseCard, expandCard } from '../actions/settings';
import { SocketContext } from '../middleware/socketcontext';

const cardColor = {
  Spring: '#9fb261',
  Summer: '#e0bc66',
  Fall: '#ac6f43',
  Winter: '#5882b2',
};

const Card = ({ card, fetchCard, cardExpanded, expandCard, collapseCard }) => {
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
        type: 'chosenPrompt',
        value: idxPrompt,
      };

      collapseCard();

      socket.emit('saveData', data);
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
          {suit}{' '}
          <span style={{ marginRight: '30px', marginLeft: '15px' }}>
            {value}
          </span>{' '}
          {season}
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
