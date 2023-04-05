import React from 'react';
import { connect } from 'react-redux';

const Log = ({ weeks }) => {
  if (!weeks) return null;

  return (
    <>
      {weeks.map((weekItem) => {
        const { weekNb, playerId, cardDrawnId, promptChosen, actions } =
          weekItem;
        <div className='log-node'>
          {weekNb}
          {playerId}
          {cardDrawnId}
          {promptChosen}
          {actions.map((action) => {
            const { type, tokens, turnsLeft, imageId, description } = action;
            <div>
              {type}
              {tokens}
              {turnsLeft}
              {imageId}
              {description}
            </div>;
          })}
        </div>;
      })}
    </>
  );
};



export default connect()(Log);
