import React from 'react';
import { connect } from 'react-redux';

const ActionDirector = ({ directions }) => {
  if(directions === undefined) return null;
  return (
    <div className='action-director-container'>
      <div className='action-director'>{directions}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    directions: state.direction.directions,
  };
};

export default connect(mapStateToProps)(ActionDirector);
