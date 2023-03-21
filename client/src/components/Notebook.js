import React from 'react';
import { connect } from 'react-redux';
import { expandNotebook, collapseNotebook } from '../actions/settings';

const Notebook = (props) => {
  const { notebookExpanded, expandNotebook, collapseNotebook } = props;

  if (notebookExpanded) {
    return (
      <div>
        <h2>Notebook</h2>
        <p>Ceci est le carnet de notes</p>
        <br />
        <button onClick={collapseNotebook}>show less</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Notebook</h2>
      <br />
      <button onClick={expandNotebook}>read more</button>
    </div>
  );
};

export default connect(
  (state) => ({
    notebookExpanded: state.settings.notebookExpanded,
  }),
  { expandNotebook, collapseNotebook }
)(Notebook);
