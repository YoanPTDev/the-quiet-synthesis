// components/NotebookWrapper.js
// Ce composant React connecté à Redux 
// wrap le Notebook et l'affiche au click
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React from 'react';
import { connect } from 'react-redux';
import Notebook from './Notebook';
import { expandNotebook, collapseNotebook } from '../actions/settings';
import { addRipple } from '../animations';
import { AnimatePresence } from 'framer-motion';

const NotebookWrapper = (props) => {
  const { notebookExpanded, expandNotebook, collapseNotebook } = props;

  const toggleNotebook = () => {
    if (notebookExpanded) {
      collapseNotebook();
    } else {
      expandNotebook();
    }
  };

  return (
    <div>
      <button onClick={(event) => {addRipple(event, "var(--notebook-button)"); toggleNotebook();}} className='menu-button note-button'>
        <div className='notebook-icon'></div>
      </button>
      <AnimatePresence>
        {notebookExpanded && <Notebook />}
      </AnimatePresence>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notebookExpanded: state.settings.notebookExpanded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    expandNotebook: () => dispatch(expandNotebook()),
    collapseNotebook: () => dispatch(collapseNotebook()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookWrapper);
