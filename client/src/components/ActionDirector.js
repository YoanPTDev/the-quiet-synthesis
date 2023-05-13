import React from 'react';
import { connect } from 'react-redux';

const ActionDirector = ({ directions }) => {
  return (
    <div className='action-director-container'>
      <div className='action-director'>{directions[0]}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    directions: state.directions,
  };
};

export default connect(mapStateToProps)(ActionDirector);
