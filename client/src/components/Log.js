import React, { useEffect, useContext } from 'react';
import { SocketContext } from '../middleware/socketcontext';
import { connect } from 'react-redux';
import { fetchLog } from '../actions/log';

const Log = ({ weeks, fetchLog }) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on('logData', (data) => {
        console.log(data);
        fetchLog(data);
      });

      // Clean up event listeners when the component is unmounted
      return () => {
        socket.off('logData');
      };
    }
  }, [socket, fetchLog]);

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
