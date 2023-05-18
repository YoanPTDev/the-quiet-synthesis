// components/NotebookWrapper.js
import React from 'react';
import { connect } from 'react-redux';
import Notebook from './Notebook';
import { expandNotebook, collapseNotebook } from '../actions/settings';
import { addRipple } from '../animations';

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
      <button onClick={(event) => {addRipple(event, "var(--notebook-button)"); toggleNotebook();}} className='menu-button'>
        <div className='notebook-icon'></div>
      </button>
      {notebookExpanded && <Notebook />}
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
