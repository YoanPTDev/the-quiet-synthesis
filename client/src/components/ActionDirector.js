import React from 'react';
import { connect } from 'react-redux';

const ActionDirector = ({ directions, font }) => {
  if(directions === undefined) return null;
  return (
    <div className={'unclickable action-director-container'}>
      <div className={`action-director ${font === 'small-direction' ? 'small-direction' : ''}`}>{directions}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    directions: state.direction.directions,
    font: state.direction.font,
  };
};

export default connect(mapStateToProps)(ActionDirector);
