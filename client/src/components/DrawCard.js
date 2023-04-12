import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { fetchCard } from '../actions/card';

const DrawCard = ({ fetchCard }) => {
  const socket = useContext(SocketContext);

  return (
    <div>
      <button onClick={fetchCard}>Pige une carte</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  const {socket} = props;
  return {
    fetchCard: () => dispatch(fetchCard(socket)),
  };
};

const componentConnector = connect(null, mapDispatchToProps);

const ConnectedDrawCard = componentConnector(DrawCard);

const DrawCardWrapper = (props) => {
  const socket = useContext(SocketContext);
  return <ConnectedDrawCard {...props} socket={socket} />;
};

export default DrawCardWrapper;
