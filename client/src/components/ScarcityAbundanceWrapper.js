import React from 'react';
import { connect } from 'react-redux';
import ScarcityAbundanceLog from './ScarcityAbundance';
import {
  expandScarcityAbundanceLog,
  collapseScarcityAbundanceLog,
} from '../actions/settings';

const ScarcityAbundanceWrapper = (props) => {
  const {
    scarcityAbundanceLogExpanded,
    expandScarcityAbundanceLog,
    collapseScarcityAbundanceLog,
  } = props;

  const toggleScarcityAbundanceLog = () => {
    if (scarcityAbundanceLogExpanded) {
      collapseScarcityAbundanceLog();
    } else {
      expandScarcityAbundanceLog();
    }
  };

  return (
    <div>
      <button onClick={toggleScarcityAbundanceLog}>
        {scarcityAbundanceLogExpanded
          ? 'Hide Scarcities and abundances Log'
          : 'Show Scarcities and abundances Log'}
      </button>
      {scarcityAbundanceLogExpanded && <ScarcityAbundanceLog />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    scarcityAbundanceLogExpanded: state.settings.scarcityAbundanceLogExpanded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    expandScarcityAbundanceLog: () => dispatch(expandScarcityAbundanceLog()),
    collapseScarcityAbundanceLog: () => dispatch(collapseScarcityAbundanceLog()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScarcityAbundanceWrapper);
