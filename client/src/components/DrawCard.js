import React from 'react';
import { connect } from 'react-redux';
import { fetchDrawCard } from '../actions/card';

const DrawCard = ({ fetchDrawCard }) => {
  return (
    <div>
      <button onClick={fetchDrawCard}>Pige une carte</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return { fetchDrawCard: () => dispatch(fetchDrawCard()) };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(DrawCard);