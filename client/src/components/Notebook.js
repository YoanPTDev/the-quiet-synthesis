import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { expandNotebook, collapseNotebook } from '../actions/settings';
import NotebookInput from './NotebookInput';
import { SocketContext } from '../middleware/socketcontext';

const Notebook = (props) => {
  const { notebookData, notebookExpanded, expandNotebook, collapseNotebook } =
    props;
  const socket = useContext(SocketContext);

  const renderNotebookData = () => {
    if (notebookData) {
      return notebookData.map((data, index) => <p key={index}>{data.value}</p>);
    }
  };

  if (notebookExpanded) {
    return (
      <div>
        <h2>Notebook</h2>
        <hr />
        {renderNotebookData()}
        <hr />
        <NotebookInput
          onSave={(data) => {
            console.log('data', data);
            socket.emit('saveData', data);
          }}
        />
        <hr />
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
    notebookData: state.note.data,
  };
};

// Spécifier quel action creator methods on veut attacher à notre component
// Donnant un accès automatique méthode de dispatch de Redux
const mapDispatchToProps = (dispatch) => {
  return {
    expandNotebook: () => dispatch(expandNotebook()),
    collapseNotebook: () => dispatch(collapseNotebook()),
  };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(Notebook);
