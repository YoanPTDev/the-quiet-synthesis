import React from 'react';
import { connect } from 'react-redux';

const Card = ({ cards }) => {
  if (!cards) return null;

  const { _id, value, suit, season, prompts } = cards;

  return (
    <>
      <h3>
        {value} of {suit}
      </h3>
      <h4>{season}</h4>
      {prompts.map((prompt) => {
        <div>{prompt}</div>;
      })}
    </>
  );
};

// export default connect(({ deck: { cards } }) => ({ cards }))(Card);
export default Card;
