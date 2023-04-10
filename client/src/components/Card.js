import React from 'react';
import { connect } from 'react-redux';

const Card = ({ card }) => {
  if (!card) return null;

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
        <div>{prompt}</div>;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    card: state.card.card,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(({ card: { card } }) => ({ card }))(Card);
// export default Card;
