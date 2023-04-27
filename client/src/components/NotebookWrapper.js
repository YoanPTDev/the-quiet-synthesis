// components/NotebookWrapper.js
import React from 'react';
import { connect } from 'react-redux';
import Notebook from './Notebook';
import { expandNotebook, collapseNotebook } from '../actions/settings';

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
      <button onClick={toggleNotebook}>
        {notebookExpanded ? 'Hide Notebook' : 'Show Notebook'}
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
