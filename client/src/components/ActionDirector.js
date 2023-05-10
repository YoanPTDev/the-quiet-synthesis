import React from 'react';
import { connect } from 'react-redux';

const ActionDirector = (props) => {
  return (
    <div className='action-director-container'>
      <div className='action-director'>{props.direction}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    directions: state.directions,
  };
};

export default connect(mapStateToProps)(ActionDirector);
