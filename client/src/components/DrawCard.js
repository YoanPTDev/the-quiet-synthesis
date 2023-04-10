import React from 'react';
import { connect } from 'react-redux';
import { fetchCard } from '../actions/card';

const DrawCard = ({ fetchCard }) => {
  return (
    <div>
      <button onClick={fetchCard}>Pige une carte</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return { fetchCard: () => dispatch(fetchCard()) };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(DrawCard);