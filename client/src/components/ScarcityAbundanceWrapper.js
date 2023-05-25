import React from 'react';
import { connect } from 'react-redux';
import ScarcityAbundanceLog from './ScarcityAbundance';
import {
  expandScarcityAbundanceLog,
  collapseScarcityAbundanceLog,
} from '../actions/settings';
import { addRipple } from '../animations';
import { AnimatePresence } from 'framer-motion';

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
      <button onClick={(event) => {addRipple(event, "var(--abunscar-button)"); toggleScarcityAbundanceLog();}} className='menu-button scab-button'>
        <div className='scarabun-icon'></div>
      </button>
      <AnimatePresence>
        {scarcityAbundanceLogExpanded && <ScarcityAbundanceLog />}
      </AnimatePresence>
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
