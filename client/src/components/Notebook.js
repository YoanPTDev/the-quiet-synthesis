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


const mapStateToProps = (state) => {
  return {
    notebookExpanded: state.settings.notebookExpanded,
  };
};

// Spécifier quel action creator methods on veut attacher à notre component
// Donnant un accès automatique méthode de dispatch de Redux
const mapDispatchToProps = dispatch => {
  return {
    expandNotebook: () => dispatch(expandNotebook()), 
    collapseNotebook: () => dispatch(collapseNotebook()) 
  }
}

const componentConnector =  connect(mapStateToProps, mapDispatchToProps);


export default componentConnector(Notebook);
