import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCard } from '../actions/card';

const Card = ({ card }) => {
  if (card.id === '') return null;

  const { id, value, suit, season, prompts } = card;

  return (
    <div
      key={id}
      className='card-item'>
      <h3>
        {value} of {suit}
      </h3>
      <h4>{season}</h4>
      {prompts.map((prompt) => {
        return <div key={prompts.indexOf(prompt)}>{prompt}</div>;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { card: state.card };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCard: () => dispatch(fetchCard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
// export default Card;
