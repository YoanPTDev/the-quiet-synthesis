// components/IncompleteProjectPickerWrapper.js
// Ce composant React connecté à Redux 
// wrap le IncompleteProjectPicker
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React from 'react';
import { connect } from 'react-redux';
import IncompleteProjectPicker from './IncompleteProjectsPicker';
import { collapseIncompleteProjectPicker, expandIncompleteProjectPicker } from '../actions/settings';
import { addRipple } from '../animations';
import { AnimatePresence } from 'framer-motion';

const IncompleteProjectsPickerWrapper = (props) => {
  const { incompleteProjectPickerExpanded, expandIncompleteProjectPicker, collapseIncompleteProjectPicker } =
    props;

  const toggleIncompleteProjectsPicker = () => {
    if (incompleteProjectPickerExpanded) {
      collapseIncompleteProjectPicker();
    } else {
      expandIncompleteProjectPicker();
    }
  };

  return (
    <div>
      <button onClick={(event) => {addRipple(event, "var(--unfinished-button)"); toggleIncompleteProjectsPicker();}} className='menu-button proj-button'>
        <div className='project-icon'></div>
      </button>
      <AnimatePresence>
        {incompleteProjectPickerExpanded && <IncompleteProjectPicker />}
      </AnimatePresence>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    incompleteProjectPickerExpanded: state.settings.incompleteProjectPickerExpanded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    expandIncompleteProjectPicker: () => dispatch(expandIncompleteProjectPicker()),
    collapseIncompleteProjectPicker: () => dispatch(collapseIncompleteProjectPicker()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncompleteProjectsPickerWrapper);
